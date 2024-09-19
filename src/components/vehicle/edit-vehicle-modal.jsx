"use client";

import { useState, useEffect } from "react";
import { VehicleServices } from "@/helpers/vehicle";
import { useSwal } from "@/utils/useSwal";

// VehicleServices sınıfını başlatıyor
const vehicleServices = new VehicleServices();

export default function EditVehicleModal({ vehicle, onUpdated }) {
    // Sweet Alert kullanımı utils/useSwal.ts
  const alerts = useSwal();
  // Duzenlenen arac bilgilerini tutan state
  const [editedVehicle, setEditedVehicle] = useState({
    plate: "",
    brand: "",
    modelYear: "",
  });

  // Input degeri degistiginde state'i guncelliyor
  useEffect(() => {
    if (vehicle) {
      setEditedVehicle({
        plate: vehicle.Plate || "",
        brand: vehicle.Brand || "",
        modelYear: vehicle.ModelYear || "",
      });
    }
  }, [vehicle]);

  // Input degeri degistiginde state'i guncelliyor
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle((prev) => ({ ...prev, [name]: value }));
  };

  // form gonderildiginde calisir
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guncellenmis arac nesnesi olusturuluyor
    const updatedVehicle = {
      ...editedVehicle,
      id: vehicle.VehicleId,
      customerId: vehicle.CustomerId,
    };

    const confirmed = await alerts.question(
      "Emin misiniz?",
      "Araç güncellenecektir. Onaylıyor musunuz?"
    );

    // eger yukarıda acilan alert onaylanırsa aracı guncellemek icin asagidaki fonksiyonu calistirir
    if (confirmed) {
      await onUpdated(updatedVehicle);
    }
  };

  return (
    <div
      className="modal fade"
      id="editVehicleModal"
      tabIndex="-1"
      aria-labelledby="editVehicleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editVehicleModalLabel">
                Aracı Düzenle - {editedVehicle.plate}
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
                  value={editedVehicle.plate}
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
                  value={editedVehicle.brand}
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
                  value={editedVehicle.modelYear}
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
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}