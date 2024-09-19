"use client";

import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";
import AddCustomerModal from "@/components/customer/add-customer-modal";
import CustomersTable from "@/components/customer/customers-table";
import TablePagination from "@/components/customer/table-pagination";
import { UserPlus } from "lucide-react";
import TotalCustomersCard from "@/components/customer/total-customers-card";
import TotalVehiclesCard from "@/components/vehicle/total-vehicles-card";

// CustomerServices sinifini baslatiyor
const customerServices = new CustomerServices();
export default function Home() {
  // Müşteri listesi, yükleme durumu ve hata durumu için state'ler
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sayfalama için state ve hesaplamalar
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Verileri yüklemek için useEffect
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Verileri yüklemek için olan fonksiyon
  const fetchCustomers = async () => {
    try {
      // Yükleniyor state'ini aktif ediyor
      setLoading(true);
      // Müşterileri alıyor
      const result = await customerServices.getAllCustomers();
      console.log(result);
      if (result.customers.success) {
        console.log(result.customers.success);
        setCustomers(result.customers.customers);
        // Yukleniyor state'ini kapatıyor
        setLoading(false);
      } else {
        setError(result.message);
        // Yukleniyor state'ini kapatıyor
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Yükleme durumunda gösterilecek içerik
  if (loading) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Listesi</h1>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Hata durumunda gösterilecek içerik
  if (error) {
    return (
      <div className="container mt-5">
        <h1>Müşteri Listesi</h1>
        <p>{error}</p>
      </div>
    );
  }
  // Müşteriler sayfası
  return (
    <div className="container mt-5">
      <AddCustomerModal fetchCustomers={fetchCustomers} />
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
      <CustomersTable
        customers={currentCustomers}
        fetchCustomers={fetchCustomers}
      />
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
