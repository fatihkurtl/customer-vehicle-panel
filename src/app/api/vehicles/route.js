import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Vehicles API", reqHed: Object.fromEntries(request.headers) });
}
