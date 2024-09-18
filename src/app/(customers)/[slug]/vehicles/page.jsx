"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CustomerServices } from "@/helpers/customer";
import { CarFront, Trash2, Pencil } from "lucide-react";

const customerServices = new CustomerServices();

export default function CustomerVehicles() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  console.log(customerId);

  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomer() {
      if (!customerId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const result = await customerServices.getCustomerById(customerId);
        setCustomer(result.customer);
        console.log(result.customer);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [customerId]);

  if (loading) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Araç Listesi</h1>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Araç Listesi</h1>
        <p>{error}</p>
      </div>
    );
  }

  const vehicles = customer.filter((item) => item.VehicleId !== null);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Müşteri Araç Listesi - {customer[0].FullName}</h1>
        {/* <h2>{customer[0].FullName}</h2> */}

        <button
          className="btn btn-primary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addCustomerModal"
          data-bs-whatever="@getbootstrap"
        >
          <span className="me-2">Araç Ekle</span>
          <CarFront size={20} />
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Plaka</th>
            <th scope="col">Marka</th>
            <th scope="col">Model</th>
            <th scope="col">Yıl</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <tr key={vehicle.Id}>
                <th scope="row">{vehicle.Id}</th>
                <td>{vehicle.LicensePlate}</td>
                <td>{vehicle.Brand}</td>
                <td>{vehicle.Model}</td>
                <td>{vehicle.Year}</td>
                <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm d-flex align-items-center justify-content-center">
                    <span className="me-1">Düzenle</span>
                    <Pencil size={16} />
                  </button>
                  <button
                    // onClick={() => deleteCustomer(customer.Id)}
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
                Müşteriye kayıtlı bir araç bulunmamaktadır.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
