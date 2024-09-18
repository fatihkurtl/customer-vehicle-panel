"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VehicleServices } from "@/helpers/vehicle";
import { Pencil, Trash2 } from "lucide-react";
import { useSwal } from "@/utils/useSwal";

const vehicleServices = new VehicleServices();

export default function VehiclesTable({ vehicles }) {

    const alerts = useSwal();
    

    return (
        <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Plaka</th>
            <th scope="col">Marka</th>
            <th scope="col">Model</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <tr key={vehicle.VehicleId}>
                <th scope="row">{vehicle.Id}</th>
                <td>{vehicle.Plate}</td>
                <td>{vehicle.Brand}</td>
                <td>{vehicle.ModelYear}</td>
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
    );
}