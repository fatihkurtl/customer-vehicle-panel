"use client";

import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";
import AddCustomerModal from "@/components/customer/add-customer-modal";
import CustomersTable from "@/components/customer/customers-table";
import TablePagination from "@/components/customer/table-pagination";
import { UserPlus } from "lucide-react";
import TotalCustomersCard from "@/components/customer/total-customers-card";
import TotalVehiclesCard from "@/components/customer/total-vehicles";

const customerServices = new CustomerServices();
export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const result = await customerServices.getAllCustomers();
      console.log(result);
      if (result.customers.success) {
        console.log(result.customers.success);
        setCustomers(result.customers.customers);
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
      <div className="row mb-4">
        <TotalCustomersCard customersCount={customers.length} />
        <TotalVehiclesCard totalVehicles={customers} />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Müşteri Listesi</h1>
        <button
          className="btn btn-primary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addCustomerModal"
          data-bs-whatever="@getbootstrap"
        >
          <span className="me-2">Müşteri Ekle</span>
          <UserPlus size={20} />
        </button>
      </div>
      <CustomersTable customers={currentCustomers} />
      {customers.length > customersPerPage && (
        <div className="d-flex justify-content-center">
          <TablePagination
            customersPerPage={customersPerPage}
            totalCustomers={customers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
