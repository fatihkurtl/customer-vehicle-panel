import { NextResponse } from "next/server";
import { deleteVehicle } from "../../../helpers/vehicle";

export async function DELETE(request, { params }) {
  try {
    const vehicleId = params.vehicleId;
    const result = await deleteVehicle(vehicleId);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
