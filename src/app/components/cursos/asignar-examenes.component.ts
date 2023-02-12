import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { CursoService } from 'src/app/services/curso.service';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html'
})
export class AsignarExamenesComponent implements OnInit{

  curso: Curso;
  autocompleteControl = new FormControl();
  examenesFiltrados: Examen[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService, 
    private examenService: ExamenService){}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params =>{
          const id = +params.get('id');
          this.cursoService.ver(id).subscribe(c => this.curso = c);
        });
    }
    

}
