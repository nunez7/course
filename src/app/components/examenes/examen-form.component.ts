import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { CommonFormComponent } from '../commont-form.component';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent  extends CommonFormComponent<Examen, ExamenService> {

  constructor(service: ExamenService,
    router: Router,
    route: ActivatedRoute) { 
        super(service, router, route);
        this.titulo = "Formulario de examenes";
        this.model = new Examen();
        this.redirect= '/examenes';
        this.nombreModel = Examen.name;
    }

}
