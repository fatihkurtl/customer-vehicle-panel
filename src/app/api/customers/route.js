import { NextResponse } from "next/server";
import { testConnection } from "@/app/lib/db";

export async function GET(request) {
  await testConnection();
  return NextResponse.json({ message: "Customers API", reqHed: Object.fromEntries(request.headers) });
}
