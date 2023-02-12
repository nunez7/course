import { Component, Inject, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Examen } from 'src/app/models/examen';

@Component({
  selector: 'app-responder-examen-modal',
  templateUrl: './responder-examen-modal.component.html'
})
export class ResponderExamenModalComponent implements OnInit{

  curso: Curso;
  alumno: Alumno;
  examen: Examen;

  respuestas = ['Alguna'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<ResponderExamenModalComponent>){}

  ngOnInit(): void {
    this.curso = this.data.curso as Curso;
    this.alumno = this.data.alumno as Alumno;
    this.examen = this.data.examen as Examen;
  }

  cancelar(): void{
    this.modalRef.close();
  }

}
