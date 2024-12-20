import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Quejas } from '../models/Quejas';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuejaPorTipoDTO } from '../models/QuejaPorTipoDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class QuejasService {
  private url = `${base_url}/quejas`;
    listaCambio=new Subject<Quejas[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Quejas[]>(this.url);
  }
  insert(qu: Quejas) {
    return this.http.post(this.url, qu);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Quejas[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
  
    listId(id: number) {
      return this.http.get<Quejas>(`${this.url}/${id}`);
    }
  
    update(qu: Quejas) {
      return this.http.put(this.url,qu);
    }
    listByUsername(username: string): Observable<Quejas[]> {
      const params = new HttpParams().set('username', username);
      return this.http.get<Quejas[]>(`${this.url}/misquejas`, { params });
    }
    getQuantity():Observable<QuejaPorTipoDTO[]>{
      return this.http.get<QuejaPorTipoDTO[]>(`${this.url}/quejasportipo`)
    }
}
