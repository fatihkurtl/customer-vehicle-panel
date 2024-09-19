// API servisleri
export class ApiServices {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }


  // Genel istek methodu, tüm http isteklerini yapar 
    async request(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        ...options.headers,
      };
      let body = options.body;
  
      // FormData ve JSON govdesi icin Content-Type ayarlar
      if (body instanceof FormData) {
        delete headers['Content-Type'];
      } else if (typeof body === 'object') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
      }
  
      const config = {
        method: options.method,
        headers,
        body,
      };
  
      try {
        const response = await fetch(url, config);
        const responseData = await response.text();
  
        // Basarisiz isteklerde hata mesajı döndürür
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, body: ${responseData}`);
        }
        
        // Yanıtı JSON olarak parse edip geri döndürür veya bos bir nesne döndürür
        return responseData ? JSON.parse(responseData) : {};
      } catch (error) {
        console.error('Request error:', error);
        throw error;
      }
    }
  
    // Get isteklerini yapar
    async get(endpoint, headers = {}) {
      return this.request(endpoint, { method: "GET", headers });
    }
  
    // Post isteklerini yapar
    async post(endpoint, body, headers = {}) {
      return this.request(endpoint, { method: "POST", body, headers });
    }
  
    // Put isteklerini yapar
    async put(endpoint, body, headers = {}) {
      return this.request(endpoint, { method: 'PUT', body, headers });
    }
  
    // Delete isteklerini yapar
    async delete(endpoint, body, headers = {}) {
      return this.request(endpoint, { method: 'DELETE', body, headers });
    }
  }
  
  // ApiServices sinifinin bir örnegini olusturup, export ediyor
  const api = new ApiServices(process.env.NEXT_PUBLIC_BASE_API_URL);
  export default api;