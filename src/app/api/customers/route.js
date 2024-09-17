import { NextResponse } from "next/server";
import { getAllCustomers } from "../helpers/customer";

export async function GET() {
  try {
    const customers = await getAllCustomers();
    return NextResponse.json({ success: true, status: 200, customers });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}