import { initializeDatabase, executeQuery } from "@/app/lib/db";

// Araçlar için Temel fonksiyonlar / veritabani işlemleri 

// Tüm araçları getiren fonksiyon
export async function getAllVehicles() {
  await initializeDatabase();
  const query = `
      USE CustomerVehicleService;
      SELECT * FROM Vehicles;
    `;
  const result = await executeQuery(query);
  return result.recordset;
}

// Yeni araç ekleyen fonksiyon
export async function addVehicle(customerId, data) {
  await initializeDatabase();

  // Aynı müşteriye ait aynı plakaya sahip araç var mı kontrol eder
  const checkVehicleQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Vehicles WHERE CustomerId = ${customerId} AND Plate = '${data.plate}';
  `;
  const checkVehicleResult = await executeQuery(checkVehicleQuery);

  // Başka bir müşteriye ait aynı plakaya sahip araç var mı kontrol eder
  const checkOtherVehiclesQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Vehicles WHERE CustomerId != ${customerId} AND Plate = '${data.plate}';
  `;

  const checkOtherVehiclesResult = await executeQuery(checkOtherVehiclesQuery);

  if (checkVehicleResult.recordset.length > 0) {
    return {
      success: false,
      status: 400,
      message: "Aracınız zaten kayıtlı",
    };
  } else if (checkOtherVehiclesResult.recordset.length > 0) {
    return {
      success: false,
      status: 400,
      message: "Bu plakaya sahip bir araç zaten kayıtlı",
    };
  } else {
    // Yeni aracı ekler
    const insertVehicleQuery = `
    USE CustomerVehicleService;
    INSERT INTO Vehicles (CustomerId, Brand, Plate, ModelYear) VALUES (${customerId}, '${data.brand}', '${data.plate}', ${data.modelYear});
  `;
    const insertResult = await executeQuery(insertVehicleQuery);
    return {
      success: true,
      status: 200,
      message: "Araç eklendi",
      vehicle: insertResult.recordset,
    };
  }
}

// Araç silen fonksiyon
export async function deleteVehicle(vehicleId) {
  await initializeDatabase();

  // Aracın var olup olmadığını kontrol eder
  const checkVehicleQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Vehicles WHERE Id = ${vehicleId};
  `;
  const result = await executeQuery(checkVehicleQuery, [
    { name: "Id", value: vehicleId },
  ]);

  if (result.recordset.length === 0) {
    return {
      success: false,
      status: 404,
      message: "Araç bulunamadı",
    };
  } else {
    // Aracı siler
    const deleteVehicleQuery = `
    USE CustomerVehicleService;
    DELETE FROM Vehicles WHERE Id = ${vehicleId};
  `;
    const deleteResult = await executeQuery(deleteVehicleQuery, [
      { name: "Id", value: vehicleId },
    ]);
    return {
      success: true,
      status: 200,
      message: "Araç silindi",
    };
  }
}

// Araç bilgilerini güncelleyen fonksiyon 
export async function editVehicle(vehicleId, data) {
  await initializeDatabase();

  // Aracın var olup olmadığını kontrol eder
  const checkVehicleQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Vehicles WHERE Id = ${vehicleId};
  `;

  const checkVehicleResult = await executeQuery(checkVehicleQuery, [
    { name: "Id", value: vehicleId },
  ]);

  if (checkVehicleResult.recordset.length === 0) {
    return {
      success: false,
      status: 404,
      message: "Araç bulunamadı",
    };
  } else {
    // Araç bilgilerini günceller
    const updateVehicleQuery = `
    USE CustomerVehicleService;
    UPDATE Vehicles SET Brand = '${data.brand}', Plate = '${data.plate}', ModelYear = ${data.modelYear} WHERE Id = ${vehicleId};
  `;
    const updateResult = await executeQuery(updateVehicleQuery, [
      { name: "Id", value: vehicleId },
    ]);
    return {
      success: true,
      status: 200,
      message: "Araç bilgileri güncellendi",
    };
  }
}
