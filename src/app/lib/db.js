import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config();
const config = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};password=${process.env.DB_PASSWORD};trustservercertificate=True;`;

const _port = 55469;

export async function executeQuery(query, params = []) {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    params.forEach((param) => {
      request.input(param.name, param.value);
    });

    const result = await request.query(query);
    return result;
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  } finally {
    await mssql.close();
  }
}

export async function createDatabase() {
  const query = `
    IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CustomerVehicleService')
    BEGIN
        CREATE DATABASE CustomerVehicleService;
    END
  `;
  await executeQuery(query);
}

export async function createCustomersTable() {
  const query = `
    USE CustomerVehicleService;
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Customers' and xtype='U')
    BEGIN
        CREATE TABLE Customers (
            Id INT IDENTITY(1,1) PRIMARY KEY,
            FullName NVARCHAR(100) NOT NULL UNIQUE,
            CreatedAt DATETIME2 DEFAULT GETDATE()
        );
    END
  `;
  await executeQuery(query);
}

export async function createVehiclesTable() {
  const query = `
    USE CustomerVehicleService;
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Vehicles' and xtype='U')
    BEGIN
        CREATE TABLE Vehicles (
            Id INT IDENTITY(1,1) PRIMARY KEY,
            CustomerId INT NOT NULL,
            Brand NVARCHAR(50) NOT NULL,
            Plate NVARCHAR(20) NOT NULL UNIQUE,
            ModelYear INT NOT NULL,
            CreatedAt DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
        );
    END
  `;
  await executeQuery(query);
}

export async function initializeDatabase() {
  await createDatabase();
  await createCustomersTable();
  await createVehiclesTable();
  console.log("Database and tables initialized successfully");
}
