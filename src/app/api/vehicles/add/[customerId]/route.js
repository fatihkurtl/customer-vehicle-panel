import { NextResponse } from "next/server";
import { addVehicle } from "../../../helpers/vehicle";

// Belirli bir musteriye arac ekleme fonksiyonu / ID ile / API
export async function POST(request, { params }) {
  const body = await request.json();
  const customerId = params.customerId;

  // helpers/vehicle.js'deki addVehicle fonksiyonu
  const result = await addVehicle(customerId, body);
  console.log("result: ", result);
  console.log("body: ", body);
  console.log("customerId: ", customerId);

  if (result.success) {
    return NextResponse.json({ result });
  } else {
    return NextResponse.json({ result });
  }
}
