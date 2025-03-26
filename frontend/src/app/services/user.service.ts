import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  async getUsers() {
    const response = await axios.get(`${this.apiUrl}/home`);
    return response.data;
  }

  async addUser(user: any) {
    const response = await axios.post(`${this.apiUrl}/users`, user);
    return response.data;
  }

  async updateUser(id: string, user: any) {
    const response = await axios.put(`${this.apiUrl}/update/${id}`, user);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await axios.delete(`${this.apiUrl}/users/${id}`);
    return response.data;
  }
}
