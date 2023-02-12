import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { CursoService } from 'src/app/services/curso.service';
import { ExamenService } from 'src/app/services/examen.service';
import {map, mergeMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html'
})
export class AsignarExamenesComponent implements OnInit{

  curso: Curso;
  autocompleteControl = new FormControl();
  examenesFiltrados: Examen[] = [];
  examenesAsignar: Examen[] = [];
  mostrarColumnas: string[] =  ['nombre', 'asignatura'];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService, 
    private examenService: ExamenService){}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params =>{
          const id = +params.get('id');
          this.cursoService.ver(id).subscribe(c => this.curso = c);
        });
        this.autocompleteControl.valueChanges.pipe(
          map(valor => typeof valor === 'string'? valor: valor.nombre),
          mergeMap(valor => valor? this.examenService.filtrarPorNombre(valor): [])
        ).subscribe(examenes => this.examenesFiltrados = examenes);
    }
    
    mostrarNombre(examen?: Examen): string{
      return examen? examen.nombre: '';
    }

    seleccionarExamen(event: MatAutocompleteSelectedEvent): void{
      const examen = event.option.value as Examen;
      this.examenesAsignar = this.examenesAsignar.concat(examen);
      //Reset autocomplete
      this.autocompleteControl.setValue('');
      event.option.deselect();
      event.option.focus();
    }
}
