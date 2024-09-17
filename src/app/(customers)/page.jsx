"use client";
import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";


const customerServices = new CustomerServices();
export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const result = await customerServices.getAllCustomers();
    console.log(result);
  };


  return (
    <div>
      <h1 className="">Hello world!</h1>
    </div>
  );
}
