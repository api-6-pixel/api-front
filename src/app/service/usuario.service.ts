import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../interfaces/usuario-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Access-Control-Allow-Origin': '*'
  })

  constructor(private http: HttpClient) { }

  obterUsuario(id: number) {
    return this.http.get<UsuarioDTO>(`${environment.api}/usuarios/${id}`, { headers: this.headers })
  }

  atualizarUsuario(id: number, body: UsuarioDTO) {
    return this.http.put<UsuarioDTO>(`${environment.api}/usuarios/${id}`, body, { headers: this.headers })
  }
}
