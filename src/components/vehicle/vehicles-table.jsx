"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VehicleServices } from "@/helpers/vehicle";
import { Pencil, Trash2 } from "lucide-react";
import { useSwal } from "@/utils/useSwal";

const vehicleServices = new VehicleServices();

export default function VehiclesTable({ vehicles }) {
  const alerts = useSwal();

  const deleteVehicle = async (id) => {
    try {
      const confirmed = await alerts.question(
        "Emin misiniz?",
        "Araç silinecektir. Onaylıyor musunuz?"
      );
      if (confirmed) {
        const response = await vehicleServices.deleteVehicle(id);
        if (response.result.success) {
          alerts.success("Başarılı", response.result.message);
        } else {
          alerts.error("Hata", "Araç silinirken bir hata oluştu.");
        }
      }
    } catch (error) {
      console.log(error);
      alerts.error("Hata", "Araç silinirken bir hata oluştu.");
    }
  };

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
              <th scope="row">{vehicle.VehicleId}</th>
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
                    onClick={() => deleteVehicle(vehicle.VehicleId)}
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
