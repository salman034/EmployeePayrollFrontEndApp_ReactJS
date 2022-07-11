import axios from 'axios';


class EmployeeService {
      baseUrl= "http://localhost:8080/home";
  
  addEmployee(data) {
    return axios.post(`${this.baseUrl}/create`, data);
  }

  getAllEmployees() {
    return axios.get(`${this.baseUrl}/get/all`);
  }

  getEmployee(employee_id) {
    return axios.get(`${this.baseUrl}/get/${employee_id}`);
  }

  updateEmployee(employee_id,data) {
    return axios.put(`${this.baseUrl}/update/${employee_id}`, data);
  }
  
  deleteEmployee(employee_id) {
    return axios.delete(`${this.baseUrl}/delete/${employee_id}`);
    
  }
}  
export default new EmployeeService();