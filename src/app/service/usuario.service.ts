import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../interfaces/usuario-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient, private httpService: HttpService) { }

  obterUsuario(id: number) {
    return this.http.get<UsuarioDTO>(`${environment.api}/usuarios/${id}`, { headers: this.httpService.getHeaders() })
  }

  atualizarUsuario(id: number, body: UsuarioDTO) {
    return this.http.put<UsuarioDTO>(`${environment.api}/usuarios/${id}`, body, { headers: this.httpService.getHeaders() })
  }

  deletarUsuario(id:number){
    return this.http.delete<UsuarioDTO>(`${environment.api}/usuarios/${id}`, { headers: this.httpService.getHeaders() })    
  }
}
