"use client";
import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";
import AddCustomerModal from "@/components/customer/add-customer-modal";
import CustomersTable from "@/components/customer/customers-table";

const customerServices = new CustomerServices();
export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const result = await customerServices.getAllCustomers();
      console.log(result);
      if (result.success) {
        setCustomers(result.customers);
        setLoading(false);
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Listesi</h1>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Listesi</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <AddCustomerModal />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Müşteri Listesi</h1>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addCustomerModal"
          data-bs-whatever="@getbootstrap"
        >
          Müşteri Ekle
        </button>
      </div>
      <CustomersTable customers={customers} />
    </div>
  );
}
