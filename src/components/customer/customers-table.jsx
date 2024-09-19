"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, CarFront } from "lucide-react";
import { CustomerServices } from "@/helpers/customer";
import { useSwal } from "@/utils/useSwal";
import { slugify } from "@/utils/slugify";
import EditCustomerModal from "./edit-customer-modal";

// CustomerServices sınıfını başlatıyor, bu sınıf müşteri işlemleri için API çağrıları yapıyor
const customerServices = new CustomerServices();

export default function CustomersTable({ customers, fetchCustomers }) {
  // Sweet Alert kullanımı utils/useSwal.ts
  const alerts = useSwal();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerList, setCustomerList] = useState(null);

  // Modal elementi seciliyor
  const modal = document.getElementById("editCustomerModal");
  const backdrops = document.getElementsByClassName("modal-backdrop");

  // Input degeri degistiginde state'i guncelliyor
  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  // Musteri silme fonksiyonu
  const deleteCustomer = async (id) => {
    try {
      const confirmed = await alerts.question(
        "Emin misiniz?",
        "Müşteri silinecektir. Onaylıyor musunuz?"
      );

      // eger yukarıda acilan alert onaylanırsa aracı silmek icin asagidaki fonksiyonu calistirir
      if (confirmed) {
        console.log("Deleting customer with ID:", id);
        const response = await customerServices.deleteCustomer(id);
        if (response.result.success) {
          console.log(response);
          // Silme islemi basariliysa, utils/useSwal.ts'den success alerti veriyor
          alerts.success("Başarılı", "Müşteri silindi.");
          // Musteri listesini yenileniyor, silinen musteriyi filtreliyor
          setCustomerList(customerList.filter((customer) => customer.Id !== id));
        } else {
          alerts.error("Hata", "Müşteri silinirken bir hata oluştu.");
        }
      }
    } catch (error) {
      console.log(error);
      alerts.error("Hata", "Müşteri silinirken bir hata oluştu.");
    }
  };

  // Edit olacak musteri bilgilerini state'e aktaracak fonksiyon
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // API servis kullanarak musteri bilgilerini update edecek fonksiyon
  const updateCustomer = async (updatedCustomer) => {
    console.log("Updated customer:", updatedCustomer);
    try {
      // helpers/customer.js'deki editCustomer fonksiyonu
      const response = await customerServices.editCustomer(
        updatedCustomer.Id,
        updatedCustomer
      );
      console.log(response);
      if (response.result.success) {
        console.log(response);
        // Islem basarili ise utils/useSwal.ts'den success alerti veriyor
        alerts.success("Başarılı", response.result.message);
        // Musteri listesini yenileniyor
        fetchCustomers();
        // Modal kapatiliyor
        modal.classList.add("d-none");
        document.body.classList.remove("modal-open");
        while (backdrops.length > 0) {
          backdrops[0].parentNode.removeChild(backdrops[0]);
        }
      } else {
        alerts.error("Hata", response.result.message);
      }
    } catch (error) {
      console.log(error);
      alerts.error("Hata", "Müşteri güncellenirken bir hata oluştu.");
    }
  };

  return (
    <>
      <EditCustomerModal
        customer={selectedCustomer}
        onUpdated={updateCustomer}
      />
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kayıt Tarihi</th>
            <th scope="col">Araç Sayısı</th>
            <th scope="col">Adı Soyadı</th>
            <th scope="col">Araçlar</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {customerList && customerList.length > 0 ? (
            customerList.map((customer, index) => (
              <tr key={index}>
                <th scope="row">{customer.Id}</th>
                <td>{new Date(customer.CreatedAt).toLocaleDateString()}</td>
                <td>{customer.VehicleCount}</td>
                <td>{customer.FullName}</td>
                <td>
                  <Link
                    href={{
                      pathname: `/${slugify(customer.FullName)}/vehicles`,
                      query: { customerId: customer.Id },
                    }}
                    className="btn btn-info btn-sm d-inline-flex align-items-center"
                  >
                    <span className="me-1">Araçlar</span>
                    <CarFront size={16} />
                  </Link>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="btn btn-warning btn-sm d-flex align-items-center justify-content-center"
                      data-bs-toggle="modal"
                      data-bs-target="#editCustomerModal"
                      data-bs-whatever="@getbootstrap"
                    >
                      <span className="me-1">Düzenle</span>
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteCustomer(customer.Id)}
                      className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                    >
                      <span className="me-1">Sil</span>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="6">
                <p className="mb-0 text-muted font-italic">
                  Henüz kayıtlı bir müşteriniz bulunmamaktadır.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
