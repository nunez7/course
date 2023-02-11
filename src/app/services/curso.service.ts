import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso>{

  constructor(http: HttpClient) {
    super(http);
  }

  protected override baseEndpoint  = 'http://localhost:8090/api/cursos';
}
