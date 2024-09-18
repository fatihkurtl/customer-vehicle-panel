"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function CustomerVehicles() {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");
    console.log(customerId);
  return <div>Customer Vehicles</div>;
}
