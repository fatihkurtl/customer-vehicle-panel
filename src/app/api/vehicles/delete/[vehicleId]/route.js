import { NextResponse } from "next/server";
import { deleteVehicle } from "../../../helpers/vehicle";

// Belirli bir arac silen fonksiyon / ID ile
export async function DELETE(request, { params }) {
  try {
    const vehicleId = params.vehicleId;
    // helper/vehicle.js'deki deleteVehicle fonksiyonu
    const result = await deleteVehicle(vehicleId);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
