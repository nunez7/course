import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html'
})
export class AsignarExamenesComponent implements OnInit{

  curso: Curso;

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
