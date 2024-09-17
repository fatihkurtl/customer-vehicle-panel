import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config();
const config =
  "Server=FATIHKURT\\SQLEXP,55469;Database=CustomerVehicleService;User Id=fatihcan;password=1234;trustservercertificate=True;";

const _port = 55469;
/* const config = {
  server: "FATIHKURT\\SQLEXP",
  port: _port,
  database: "CustomerVehicleService",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
}; */

export async function testConnection() {
  try {
    mssql.connect(config, function (err) {
      if (err) console.log(err);
      let request = new mssql.Request();

      request.query("SELECT 1", function (err, recordset) {
        if (err) console.log(err);
        console.log(recordset);
      });
    });
  } catch (error) {
    console.error("Bağlantı hatası:", error);
  }
}
