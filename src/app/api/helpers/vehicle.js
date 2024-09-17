import { initializeDatabase, executeQuery } from "@/app/lib/db";

export async function getAllVehicles() {
  await initializeDatabase();
  const query = `
      USE CustomerVehicleService;
      SELECT * FROM Vehicles;
    `;
  const result = await executeQuery(query);
  return result.recordset;
}
