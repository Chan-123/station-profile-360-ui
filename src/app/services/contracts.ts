import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContractsService {

  private apiUrl = 'http://localhost:5000/api/contracts';

  constructor(private http: HttpClient) {}

  getContracts(category?: string) {
    let url = 'http://localhost:5000/api/contracts';

    if (category) {
      url += `?category=${category}`;
    }

    return this.http.get<any[]>(url);
  }

  createContract(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}