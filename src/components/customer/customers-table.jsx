"use client";

import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";
import { useSwal } from "@/utils/useSwal";
import { Pencil, Trash2, CarFront } from "lucide-react";

const customerServices = new CustomerServices();

export default function CustomersTable({ customers }) {
  const alerts = useSwal();

  const deleteCustomer = async (id) => {
    try {
      const confirmed = await alerts.question(
        "Emin misiniz?",
        "Müşteri silinecektir. Onaylıyor musunuz?"
      );
      if (confirmed) {
        console.log("Deleting customer with ID:", id);
        alerts.success("Başarılı", "Müşteri silindi.");
      }
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
          <th scope="col">Kayıt Tarihi</th>
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
              <td>{new Date(customer.CreatedAt).toLocaleDateString()}</td>
              <td>{customer.FullName}</td>
              <td>
                <a
                  href="#"
                  className="btn btn-info btn-sm d-inline-flex align-items-center"
                >
                  <span className="me-1">Araçlar</span>
                  <CarFront size={16} />
                </a>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm d-flex align-items-center justify-content-center">
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
            <td className="text-center" colSpan="4">
              Henüz kayıtlı bir müşteriniz bulunmamaktadır.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
