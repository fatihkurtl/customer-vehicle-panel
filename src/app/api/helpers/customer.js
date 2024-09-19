import { initializeDatabase, executeQuery } from "@/app/lib/db";

// Musteriler için Temel fonksiyonlar / veritabani işlemleri 

// Tüm müşterileri getiren fonksiyon
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
  // Müşteri yoksa hata döndürür, varsa müşteri listesini döndürür
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

// Belirli bir müşteriyi getiren fonksiyon / ID ile
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
  // Müşteri bulunamazsa hata döndürür, bulunursa müşteri bilgilerini döndürür
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

// Yeni müşteri ekleyen fonksiyon
export async function addCustomer(fullname) {
  await initializeDatabase();
  console.log(fullname);
  // Aynı isimde müşteri var mı diye kontrol eder
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
    // Yeni müşteriyi ekleyen sorgu
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

// Muşteriyi silen fonksiyon
export async function deleteCustomer(customerId) {
  await initializeDatabase();

  // Müşterinin var olup olmadığını kontrol eder
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
    // Müşteriyi silen sorgu
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

// Müşteri bilgilerini güncelleyen fonksiyon / ID ile
export async function editCustomer(customerId, fullname) {
  await initializeDatabase();

  // Müşterinin var olup olmadığını kontrol eder
  const checkCustomerQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Customers WHERE Id = ${customerId};
  `;

  const checkCustomerResult = await executeQuery(checkCustomerQuery, [
    { name: "Id", value: customerId },
  ]);

  if (checkCustomerResult.recordset.length === 0) {
    return {
      success: false,
      status: 404,
      message: "Müşteri bulunamadı",
    };
  } else if (checkCustomerResult.recordset[0].FullName === fullname) {
    console.log("Customer already exists");
    return {
      success: false,
      status: 400,
      message: "Bu isimle bir müşteri zaten var",
    };
  } else {
    // Müşteri bilgilerini günceller
    const query = `
    USE CustomerVehicleService;
    UPDATE Customers SET FullName = '${fullname}' WHERE Id = ${customerId};
  `;
    const result = await executeQuery(query, [
      { name: "Id", value: customerId },
      { name: "FullName", value: fullname },
    ]);

    return {
      success: true,
      status: 200,
      message: "Müşteri bilgileri güncellendi",
    };
  }
}
