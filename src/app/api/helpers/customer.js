import { initializeDatabase, executeQuery } from "@/app/lib/db";

export async function getAllCustomers() {
  await initializeDatabase();
  const query = `
    USE CustomerVehicleService;
    SELECT 
      c.Id,
      c.FullName,
      c.CreatedAt,
      COUNT(v.Id) AS VehicleCount
    FROM 
      Customers c
    LEFT JOIN 
      Vehicles v ON c.Id = v.CustomerId
    GROUP BY 
      c.Id, c.FullName, c.CreatedAt
    ORDER BY 
      c.CreatedAt DESC, c.Id DESC
  `;
  const result = await executeQuery(query);
  if (result.recordset.length === 0) {
    return {
      success: false,
      status: 404,
      message: "Henüz kayıtlı bir müşteriniz bulunmamaktadır",
    };
  } else {
    return {
      success: true,
      status: 200,
      customers: result.recordset,
    };
  }
}

export async function getCustomerById(customerId) {
  await initializeDatabase();

  const query = `
    USE CustomerVehicleService;
    SELECT 
      c.Id AS CustomerId, 
      c.FullName, 
      c.CreatedAt,
      v.Id AS VehicleId,
      v.Brand,
      v.Plate,
      v.ModelYear,
      v.CreatedAt
    FROM Customers c
    LEFT JOIN Vehicles v ON c.Id = v.CustomerId
    WHERE c.Id = ${customerId}
  `;
  const result = await executeQuery(query);
  if (result.recordset.length === 0) {
    return {
      success: false,
      status: 404,
      message: "Müşteri bulunamadı",
    };
  } else {
    return {
      success: true,
      status: 200,
      customer: result.recordset,
    };
  }
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

export async function deleteCustomer(customerId) {
  await initializeDatabase();

  const checkCustomer = `
    USE CustomerVehicleService;
    SELECT * FROM Customers WHERE Id = ${customerId};
  `;
  const result = await executeQuery(checkCustomer, [
    { name: "Id", value: customerId },
  ]);
  if (result.recordset.length === 0) {
    console.log("Customer not found");
    return {
      success: false,
      status: 404,
      message: "Müşteri bulunamadı",
    };
  } else {
    const query = `
    USE CustomerVehicleService;
    DELETE FROM Customers WHERE Id = ${customerId};
  `;
    const result = await executeQuery(query, [
      { name: "Id", value: customerId },
    ]);

    return {
      success: true,
      status: 200,
      message: "Müşteri silindi",
    };
  }
}
