"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CustomerServices } from "@/helpers/customer";
import { CirclePlus, Trash2, Pencil } from "lucide-react";
import AddVehicleModal from "@/components/vehicle/add-vehicle-modal";
import VehiclesTable from "@/components/vehicle/vehicles-table";

const customerServices = new CustomerServices();

export default function CustomerVehicles() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  console.log(customerId);

  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomer = useCallback(async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const handleVehicleAdded = () => {
    fetchCustomer();
  };

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
