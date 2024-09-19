import { NextResponse } from "next/server";
import { editCustomer } from "../../../helpers/customer";

// Belirli bir musterinin guncellendigi metod / ID ile
export async function PUT(request, { params }) {
  try {
    const customerId = params.customerId;
    const body = await request.json();
    const { fullname } = body;
    console.log("fullname:", fullname);
    console.log("customerId:", customerId);
    // helpers/customer.js'deki editCustomer fonksiyonu
    const result = await editCustomer(customerId, fullname);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
