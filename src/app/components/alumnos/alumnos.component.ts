import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit{

  titulo = 'Listado de alumnos';
  alumnos: Alumno[];

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [4, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: AlumnoService){}

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos(){
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(p => {
      this.alumnos = p.content as Alumno[]; //Convertimos los alumnos
      this.totalRegistros = p.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    });
  }

  public eliminar(alumno: Alumno): void{
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${alumno.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(alumno.id).subscribe(() => {
          //this.alumnos = this.alumnos.filter(a=> a!==alumno);
          this.calcularRangos();
          Swal.fire('Eliminado', `Alumno ${alumno.nombre} eliminado con éxito!`, 'success');
        });
      }
    });
  }
}
