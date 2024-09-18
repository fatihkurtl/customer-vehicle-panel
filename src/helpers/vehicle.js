import api from "../services/api";

export class VehicleServices {
  constructor() {
    this.BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
    this.ENDPOINT = "/vehicles";
  }

  async getAllVehicles() {
    try {
      return await api.get(this.ENDPOINT);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addVehicle(customerId, data) {
    try {
      return await api.post(`${this.ENDPOINT}/add/${customerId}`, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
