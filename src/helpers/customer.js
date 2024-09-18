import api from "../services/api";

export class CustomerServices {
  constructor() {
    this.BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
    this.ENDPOINT = "/customers";
  }

  async getAllCustomers() {
    try {
      return await api.get(this.ENDPOINT);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addCustomer(data) {
    try {
      return await api.post(`${this.ENDPOINT}/add`, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteCustomer(customerId) {
    try {
      return await api.delete(`${this.ENDPOINT}/delete/${customerId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
}
