import { NextResponse } from "next/server";
import { editVehicle } from "../../../helpers/vehicle";


// Belirli bir aracın bilgilerini guncelleyen fonksiyon / ID ile
export async function PUT(request, { params }) {
  try {
    const vehicleId = params.vehicleId;
    const body = await request.json();
    // body'den gelen bilgiler
    const { brand, plate, modelYear } = body;
    console.log("brand:", brand);
    console.log("plate:", plate);
    console.log("modelYear:", modelYear);
    console.log("vehicleId:", vehicleId);
    // helper/vehicle.js'deki editVehicle fonksiyonu
    const result = await editVehicle(vehicleId, { brand, plate, modelYear });
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
