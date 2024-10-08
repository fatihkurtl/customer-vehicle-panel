"use client";
import { useState } from "react";
import { VehicleServices } from "@/helpers/vehicle";
import { useSwal } from "@/utils/useSwal";

const vehicleServices = new VehicleServices();

export default function AddVehicleModal({
  customer,
  customerId,
  onVehicleAdded,
}) {
  const alerts = useSwal();

  console.log("customerId:", customerId);

  // Araç bilgilerini tutan state
  const [vehicle, setVehicle] = useState({
    plate: "",
    brand: "",
    modelYear: "",
  });

  // Input değerleri değiştiğinde state'i günceller
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  // modal elementini secer
  const modal = document.getElementById("addVehicleModal");
  const backdrops = document.getElementsByClassName("modal-backdrop");


  // form gonderildiginde calisir
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(vehicle);
      // Araç ekleme API istegi
      const response = await vehicleServices.addVehicle(customerId, vehicle);
      console.log(response);
      if (response.result.success) {
        alerts.success("Başarılı", response.result.message);
        // form alanlarını temizler
        setVehicle({
          plate: "",
          brand: "",
          modelYear: "",
        });
        onVehicleAdded();
        // modal kapatılıyor
        modal.classList.add("d-none");
        document.body.classList.remove("modal-open");
        while (backdrops.length > 0) {
          backdrops[0].parentNode.removeChild(backdrops[0]);
        }
      } else {
        alerts.error("Hata", response.result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="addVehicleModal"
      tabIndex="-1"
      aria-labelledby="addVehicleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addVehicleModalLabel">
                Yeni Araç Ekle - {customer}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="plate" className="col-form-label">
                  Plaka
                </label>
                <input
                  type="text"
                  placeholder="Araç Plakası"
                  className="form-control"
                  id="plate"
                  name="plate"
                  value={vehicle.plate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brand" className="col-form-label">
                  Marka
                </label>
                <input
                  type="text"
                  placeholder="Araç Markası"
                  className="form-control"
                  id="brand"
                  name="brand"
                  value={vehicle.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="modelYear" className="col-form-label">
                  Model Yılı
                </label>
                <input
                  type="text"
                  placeholder="Araç Model Yılı"
                  className="form-control"
                  id="modelYear"
                  name="modelYear"
                  value={vehicle.modelYear}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
              <button type="submit" className="btn btn-primary">
                Araç Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
