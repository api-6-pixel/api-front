import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.api;
@Injectable({
    providedIn: 'root'
  })
export class HttpService {
  constructor(private http: HttpClient) { }

  async get(req: string, options?: any){
    return await this.http
      .get(`${API}/${req}`, options)
      .toPromise()
      .then((result: any) => result);
  };

  async post(req: string, value: any, p0?: { responseType: string; }){
    return await this.http
      .post(`${API}/${req}`, value)
      .toPromise()
      .then((result: any) => result);
  };
  
  async put(req: string, value: any): Promise<any> {
    return await this.http
      .put(`${API}/${req}`, value) 
      .toPromise()
      .then((result: any) => result);
  }
  

  async delete(req: string, codigo: number) {
    return await this.http
      .delete(`${API}/${req}/${codigo}`)
      .toPromise()
      .then((result: any) => result);
  };
}