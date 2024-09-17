import { NextResponse } from "next/server";
import { getAllVehicles } from "../helpers/vehicle";

export async function GET(request) {
  try {
    const vehicles = await getAllVehicles();
    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching vehicles" },
      { status: 500 }
    );
  }
}
