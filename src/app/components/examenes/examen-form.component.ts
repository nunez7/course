import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { CommonFormComponent } from '../commont-form.component';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent  extends CommonFormComponent<Examen, ExamenService> {

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];

  constructor(service: ExamenService,
    router: Router,
    route: ActivatedRoute) { 
        super(service, router, route);
        this.titulo = "Formulario de examenes";
        this.model = new Examen();
        this.redirect= '/examenes';
        this.nombreModel = Examen.name;
    }

    override ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id: number = +params.get('id');
        if (id) {
          this.service.ver(id).subscribe(m => this.model = m)
        }
    });

    this.service.findAllAsignatura()
      .subscribe(asignaturas => this.asignaturasPadre = asignaturas.filter(a => !a.padre));
    }

    cargarHijos(): void{
      this.asignaturasHija = this.model.asignaturaPadre? this.model.asignaturaPadre.hijos: [];
    }
}
