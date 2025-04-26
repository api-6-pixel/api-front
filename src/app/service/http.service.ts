import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.api;
const apiIa = environment.apiIa;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token") ?? "";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  async get(req: string, options?: any) {
    return await this.http
      .get(`${API}/${req}`, { ...options, headers: this.getHeaders() })
      .toPromise()
      .then((result: any) => result);
  }

  async post(req: string, value: any, options?: any) {
    return await this.http
      .post(`${API}/${req}`, value, { ...options, headers: this.getHeaders() })
      .toPromise()
      .then((result: any) => result);
  }

  async postApiIa(req: string, value: any, options?: any) {
    return await this.http
      .post(`${apiIa}/${req}`, value, { ...options, headers: this.getHeaders() })
      .toPromise()
      .then((result: any) => result);
  }

  async put(req: string, value: any): Promise<any> {
    return await this.http
      .put(`${API}/${req}`, value, { headers: this.getHeaders() })
      .toPromise()
      .then((result: any) => result);
  }

  async delete(req: string, codigo: number) {
    return await this.http
      .delete(`${API}/${req}/${codigo}`, { headers: this.getHeaders() })
      .toPromise()
      .then((result: any) => result);
  }
}
