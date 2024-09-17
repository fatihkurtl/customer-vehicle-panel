import { initializeDatabase, executeQuery } from "@/app/lib/db";

export async function getAllCustomers() {
  await initializeDatabase();
  const query = `
    USE CustomerVehicleService;
    SELECT c.*, v.Id AS VehicleId
    FROM Customers c
    LEFT JOIN Vehicles v ON c.Id = v.CustomerId
  `;
  const result = await executeQuery(query);
  return result.recordset;
}