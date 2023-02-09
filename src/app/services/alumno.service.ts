import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private baseEndpoint = 'http://localhost:8090/api/alumnos';

  constructor(private http: HttpClient) { }
}
