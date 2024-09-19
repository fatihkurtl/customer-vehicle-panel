import api from "../services/api";

// Arac servisi
export class VehicleServices {
  constructor() {
    // API'nin temel URL'si
    this.BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
    // Arac işlemleri için endpoint
    this.ENDPOINT = "/vehicles";
  }

  // Tum araclari getiren metod
  async getAllVehicles() {
    try {
      return await api.get(this.ENDPOINT);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Yeni arac ekleme metod
  async addVehicle(customerId, data) {
    try {
      return await api.post(`${this.ENDPOINT}/add/${customerId}`, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Arac silen metod / ID ile
  async deleteVehicle(vehicleId) {
    try {
      return await api.delete(`${this.ENDPOINT}/delete/${vehicleId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Belirli bir araci guncelleyen metod / ID ile
  async editVehicle(vehicleId, data) {
    try {
      return await api.put(`${this.ENDPOINT}/edit/${vehicleId}`, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
