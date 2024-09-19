"use client";

import { useState, useEffect } from "react";
import { Car } from "lucide-react";

export default function TotalVehiclesCard({ totalVehicles }) {
  // toplam arac sayisini tutan state
  const [vehiclesCount, setVehiclesCount] = useState(0);

  // totalVehicles prop'u degeri degistiginde state'i guncelliyor
  useEffect(() => {
    let count = 0;
    for (let i = 0; i < totalVehicles.length; i++) {
      count += totalVehicles[i].VehicleCount;
    }
    setVehiclesCount(count);
  }, [totalVehicles]);

  return (
    <div className="col-md-3 mt-md-0 mt-3">
      <div className="card bg-light">
        <div className="card-body d-flex align-items-center">
          <Car size={24} className="text-success me-3" />
          <div>
            <h5 className="card-title mb-0">Toplam Araç</h5>
            <p className="card-text fs-4 fw-bold text-success mb-0">
              {vehiclesCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
