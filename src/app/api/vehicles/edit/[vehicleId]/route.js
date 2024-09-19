import { NextResponse } from "next/server";
import { editVehicle } from "../../../helpers/vehicle";

export async function PUT(request, { params }) {
  try {
    const vehicleId = params.vehicleId;
    const body = await request.json();
    const { brand, plate, modelYear } = body;
    console.log("brand:", brand);
    console.log("plate:", plate);
    console.log("modelYear:", modelYear);
    console.log("vehicleId:", vehicleId);
    const result = await editVehicle(vehicleId, { brand, plate, modelYear });
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
