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

export async function addVehicle(customerId, data) {
  await initializeDatabase();

  const checkVehicleQuery = `
    USE CustomerVehicleService;
    SELECT * FROM Vehicles WHERE CustomerId = ${customerId} AND Plate = '${data.plate}';
  `;
  const checkVehicleResult = await executeQuery(checkVehicleQuery);

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

export async function deleteVehicle(vehicleId) {
  await initializeDatabase();

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
