import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { Examen } from 'src/app/models/examen';
import { Pregunta } from 'src/app/models/pregunta';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
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
          this.service.ver(id).subscribe(m => {
            this.model = m;
            //Llenando asignatura hija
            /*this.service.findAllAsignatura().subscribe(asignaturas => 
              this.asignaturasHija = asignaturas
              .filter(a => a.padre && a.padre.id === this.model.asignaturaPadre.id));*/
            this.cargarHijos();  
          });
        }
    });

    this.service.findAllAsignatura()
      .subscribe(asignaturas => this.asignaturasPadre = asignaturas.filter(a => !a.padre));
    }

    cargarHijos(): void{
      this.asignaturasHija = this.model.asignaturaPadre? this.model.asignaturaPadre.hijos: [];
    }

    compararAsignatura(a1: Asignatura, a2: Asignatura): boolean{
      if(a1===undefined && a2===undefined){
        return true;
      }

      return (a1=== null || a2===null || a1===undefined || a2===undefined)
      ? false: a1.id === a2.id;
    }

    agregarPregunta(): void{
      this.model.preguntas.push(new Pregunta());
    }

    asignarTexto(pregunta: Pregunta, event: any):void{
      pregunta.texto = event.target.value as string;
      console.log(this.model);
    }

    eliminarPregunta(pregunta: Pregunta): void{
      this.model.preguntas = this.model.preguntas.filter(p => pregunta.texto!== p.texto);
    }

    eliminarPreguntasVacias(): void{
      this.model.preguntas = this.model.preguntas.filter(p => p.texto !=null && p.texto.length > 0);
    }

    public override crear(): void{
      if(this.model.preguntas.length === 0){
        Swal.fire('Error preguntas', 'El examen debe tener preguntas', 'error');
        return;
      }
      this.eliminarPreguntasVacias();
      super.crear();
    }

    public override editar(): void {
      if(this.model.preguntas.length === 0){
        Swal.fire('Error preguntas', 'El examen debe tener preguntas', 'error');
        return;
      }
      this.eliminarPreguntasVacias();
      super.editar();
    }
}
