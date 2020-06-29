import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export abstract class BaseService<T = any> {
  baseUrl = 'https://localhost:44384/api/';
  abstract entity: string;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<T[]>(`${this.baseUrl + this.entity}/GetAll`).toPromise();
  }

  getById(id: number) {
    return this.http.get<T>(`${this.baseUrl}${this.entity}/GetById/${id}`).toPromise();
  }

  find(data: T) {
    return this.http.post(`${this.baseUrl}${this.entity}/Find/`, JSON.stringify(data), {
      headers: new HttpHeaders()
      .set('Content-Type' , 'application/json')
      }).pipe (
        map((values: T[]) => {
          return values || values.length > 0 ? values : null;
        })
    ).toPromise();
  }

   add(data: T) {
    return this.http.post(`${this.baseUrl}${this.entity}/Add/`, JSON.stringify(data), {
      headers: new HttpHeaders()
      .set('Content-Type' , 'application/json')
      }).pipe (
        map(id => {
          return id;
        })
      ).toPromise();
  }

  update(data: T) {
    return this.http.put(`${this.baseUrl}${this.entity}/Update`, JSON.stringify(data), {
      headers: new HttpHeaders()
      .set('Content-Type' , 'application/json'),
      observe: 'response'
      }).toPromise();
  }

  delete(data: T[]) {
    return this.http.request('delete', `${this.baseUrl}${this.entity}/Delete`, {
      headers: new HttpHeaders()
      .set('Content-Type' , 'application/json'),
      body: JSON.stringify(data),
      observe: 'response'
    }).toPromise();
  }
}
