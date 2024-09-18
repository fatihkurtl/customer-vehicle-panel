import { NextResponse } from "next/server";
import { getCustomerById } from "../../helpers/customer";

export async function GET(request, { params }) {
  try {
    const customerId = params.customerId;
    const result = await getCustomerById(customerId);
    return NextResponse.json({
      success: true,
      status: 200,
      customer: result.customer,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
