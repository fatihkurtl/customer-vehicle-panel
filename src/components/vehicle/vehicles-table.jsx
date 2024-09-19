"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VehicleServices } from "@/helpers/vehicle";
import { Pencil, Trash2 } from "lucide-react";
import { useSwal } from "@/utils/useSwal";
import EditVehicleModal from "./edit-vehicle-modal";

const vehicleServices = new VehicleServices();

export default function VehiclesTable({ vehicles, fetchCustomer }) {
  const alerts = useSwal();
  const [selectedVehicle, setSelectedVehicle] = useState([]);

  const modal = document.getElementById("editVehicleModal");
  const backdrops = document.getElementsByClassName("modal-backdrop");

  const deleteVehicle = async (id) => {
    try {
      const confirmed = await alerts.question(
        "Emin misiniz?",
        "Araç silinecektir. Onaylıyor musunuz?"
      );
      if (confirmed) {
        const response = await vehicleServices.deleteVehicle(id);
        console.log(response);
        if (response.result.success) {
          alerts.success("Başarılı", response.result.message);
          fetchCustomer();
          vehicles.filter((vehicle) => vehicle.id !== id);
        } else {
          alerts.error("Hata", "Araç silinirken bir hata oluştu.");
        }
      }
    } catch (error) {
      console.log(error);
      alerts.error("Hata", "Araç silinirken bir hata oluştu.");
    }
  };

  const handleEditeVehicle = (vehicle) => {
    console.log(vehicle);
    setSelectedVehicle(vehicle);
  };

  // Araçları ekrana güncelleyen fonksiyon edit vehicle modalunda kullanılmaktadır
  const updateVehicle = async (updatedVehicle) => {
    console.log("Updated vehicle:", updatedVehicle.id);
    try {
      const response = await vehicleServices.editVehicle(
        updatedVehicle.id,
        updatedVehicle
      );
      console.log("API response:", response);
      if (response.result.success) {
        alerts.success("Başarılı", response.result.message);
        fetchCustomer();
        modal.classList.add("d-none");
        document.body.classList.remove("modal-open");
        while (backdrops.length > 0) {
          backdrops[0].parentNode.removeChild(backdrops[0]);
        }
      } else {
        alerts.error("Hata", "Araç güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
      alerts.error("Hata", "Araç güncellenirken bir hata oluştu.");
    }
  };

  return (
    <>
      <EditVehicleModal vehicle={selectedVehicle} onUpdated={updateVehicle} />
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
                    <button
                      onClick={() => handleEditeVehicle(vehicle)}
                      className="btn btn-warning btn-sm d-flex align-items-center justify-content-center"
                      data-bs-toggle="modal"
                      data-bs-target="#editVehicleModal"
                      data-bs-whatever="@getbootstrap"
                    >
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
                <p className="mb-0 text-muted font-italic">
                  Müşteriye ait kayıtlı bir araç bulunmamaktadır.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
