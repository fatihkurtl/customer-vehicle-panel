"use client";
import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";
import { useSwal } from "@/utils/useSwal";

const customerServices = new CustomerServices();

export default function CustomersTable({ customers }) {
  const alerts = useSwal();

  
  const deleteCustomer = async (id) => {
    try {
        console.log("Deleting customer with ID:", id);
    } catch (error) {
      console.log(error);
      alerts.error("Hata", "Müşteri silinirken bir hata oluştu.");
    }
  };

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Adı Soyadı</th>
          <th scope="col">Araçlar</th>
          <th scope="col">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {customers.length > 0 ? (
          customers.map((customer, index) => (
            <tr key={customer.Id}>
              <th scope="row">{customer.Id}</th>
              <td>{customer.FullName}</td>
              <td>
                <a href="#" className="btn btn-info btn-sm">
                  Araçlar
                </a>
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Düzenle</button>
                <button onClick={() => deleteCustomer(customer.Id)} className="btn btn-danger btn-sm">Sil</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="4">
              Henüz kayıtlı bir müşteriniz bulunmamaktadır.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
