"use client";
import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";

const customerServices = new CustomerServices();
export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const result = await customerServices.getAllCustomers();
    console.log(result);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Müşteri Listesi</h1>
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
          <tr>
            <th scope="row">1</th>
            <td>Örnek Müşteri</td>
            <td>
              <a href="#" className="btn btn-info btn-sm">
                Araçlar
              </a>
            </td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Düzenle</button>
              <button className="btn btn-danger btn-sm">Sil</button>
            </td>
          </tr>
          {/* Diğer müşteri satırları buraya eklenebilir */}
        </tbody>
      </table>
    </div>
  );
}
