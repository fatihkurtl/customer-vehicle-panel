"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CustomerServices } from "@/helpers/customer";
import { CirclePlus, Trash2, Pencil } from "lucide-react";
import AddVehicleModal from "@/components/vehicle/add-vehicle-modal";
import VehiclesTable from "@/components/vehicle/vehicles-table";

// CustomerServices sinifini baslatiyor
const customerServices = new CustomerServices();
export default function CustomerVehicles() {
  // Müşteri ID bilgisini URL'den alıyor
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  console.log(customerId);

  // Müşteri bilgileri, yükleme durumu ve hata durumu için state'ler
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Müşteri bilgilerini getiren fonksiyon
  const fetchCustomer = useCallback(async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // Muşteri bilgilerini alıyor /api/customers/customerId / helpers/customer.js
      const result = await customerServices.getCustomerById(customerId);
      setCustomer(result.customer);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  // Müşteri bilgilerini yüklemek için useEffect
  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  // yeni arac eklendiginde arac bilgilerini getiren fonksiyon
  const handleVehicleAdded = () => {
    fetchCustomer();
  };

  // Yükleme durumunda gösterilecek içerik
  if (loading) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Araç Listesi</h1>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Hata durumunda gösterilecek içerik
  if (error) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Araç Listesi</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Musterinin araçlarını filtreler
  const vehicles = customer.filter((item) => item.VehicleId !== null);

  // Ana icerik
  return (
    <div className="container mt-5">
      <AddVehicleModal
        customer={customer[0].FullName}
        customerId={customerId}
        onVehicleAdded={handleVehicleAdded}
      />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Müşteri Araç Listesi - {customer[0].FullName}</h1>
        <button
          className="btn btn-primary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addVehicleModal"
          data-bs-whatever="@getbootstrap"
        >
          <span className="me-2">Araç Ekle</span>
          <CirclePlus size={20} />
        </button>
      </div>
      <VehiclesTable vehicles={vehicles} fetchCustomer={fetchCustomer} />
    </div>
  );
}
