import { NextResponse } from "next/server";
import { deleteCustomer } from "../../../helpers/customer";

export async function DELETE(request, { params }) {
  try {
    const customerId = params.customerId;
    const result = await deleteCustomer(customerId);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
