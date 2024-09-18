import { NextResponse } from "next/server";
import { addVehicle } from "../../../helpers/vehicle";

export async function POST(request, { params }) {
  const body = await request.json();
  const customerId = params.customerId;

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
