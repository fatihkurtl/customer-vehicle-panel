import { NextResponse } from "next/server";
import { addCustomer } from "../../helpers/customer";

// Yeni musteri ekleyen API
export async function POST(request) {
  try {
    const body = await request.json();
    const { fullname } = body;

    console.log("Received fullname:", fullname);
    // helper/customer.js'den addCustomer fonksiyonunu cagiriyor
    const result = await addCustomer(fullname);
    console.log("Result:", result);

    if (result.success) {
      return NextResponse.json({
        result,
      });
    } else {
      return NextResponse.json({
        result,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
