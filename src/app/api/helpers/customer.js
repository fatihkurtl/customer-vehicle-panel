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

export async function addCustomer(fullname) {
  await initializeDatabase();
  console.log(fullname);
  const checkQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Customers WHERE FullName = '${fullname}';
  `;
  const checkCustormer = await executeQuery(checkQuery, [
    { name: "FullName", value: fullname },
  ]);

  if (checkCustormer.recordset.length > 0) {
    console.log("Customer already exists");
    return {
      success: false,
      status: 500,
      message: "Bu isimde bir müşteri zaten var",
    };
  } else {
    const insertCustomer = `
    USE CustomerVehicleService;
    INSERT INTO Customers (FullName) VALUES ('${fullname}');  
  `;
    const result = await executeQuery(insertCustomer, [
      { name: "FullName", value: fullname },
    ]);
    return {
      success: true,
      status: 200,
      message: `Yeni müşteri eklendi - ${fullname}`,
    };
  }
}
