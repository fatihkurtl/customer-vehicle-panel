import api from "../services/api";

// Müşteri servisi
export class CustomerServices {
  constructor() {
    // API'nin temel URL'si
    this.BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
     // Müşteri işlemleri için endpoint
    this.ENDPOINT = "/customers";
  }

  // Tum musterileri getiren metod
  async getAllCustomers() {
    try {
      return await api.get(this.ENDPOINT);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Belirli bir musteri getiren metod / ID ile
  async getCustomerById(customerId) {
    try {
      return await api.get(`${this.ENDPOINT}/${customerId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Yeni musteri ekleyen metod
  async addCustomer(data) {
    try {
      return await api.post(`${this.ENDPOINT}/add`, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Belirli bir musteri silen metod / ID ile
  async deleteCustomer(customerId) {
    try {
      return await api.delete(`${this.ENDPOINT}/delete/${customerId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Belirli bir musterinin guncellendigi metod / ID ile
  async editCustomer(customerId, data) {
    try {
      return await api.put(`${this.ENDPOINT}/edit/${customerId}`, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
