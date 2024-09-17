import { initializeDatabase, executeQuery } from "@/app/lib/db";

export async function getAllCustomers() {
  await initializeDatabase();
  const query = `
      USE CustomerVehicleService;
      SELECT * FROM Customers;
    `;
  const result = await executeQuery(query);
  return result.recordset;
}
