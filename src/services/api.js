export class ApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async request(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        ...options.headers,
      };
      let body = options.body;
  
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
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, body: ${responseData}`);
        }
  
        return responseData ? JSON.parse(responseData) : {};
      } catch (error) {
        console.error('Request error:', error);
        throw error;
      }
    }
  
    async get(endpoint, headers = {}) {
      return this.request(endpoint, { method: "GET", headers });
    }
  
    async post(endpoint, body, headers = {}) {
      return this.request(endpoint, { method: "POST", body, headers });
    }
  
    async put(endpoint, body, headers = {}) {
      return this.request(endpoint, { method: 'PUT', body, headers });
    }
  
    async delete(endpoint, body, headers = {}) {
      return this.request(endpoint, { method: 'DELETE', body, headers });
    }
  }
  
  const api = new ApiService(process.env.NEXT_PUBLIC_BASE_API_URL);
  export default api;