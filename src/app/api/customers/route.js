import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Customers API", reqHed: Object.fromEntries(request.headers) });
}
