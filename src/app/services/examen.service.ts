import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen>{

  constructor(http: HttpClient) {
    super(http);
  }

  protected override baseEndpoint  = 'http://localhost:8090/api/examenes';
}
