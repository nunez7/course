import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo : string;
  model: E;
  error: any;
  protected redirect: string;
  protected nombreModel: string;

  constructor(protected service: S,
    protected router: Router,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m => this.model = m)
      }
    })
  }

  public crear(): void {
    this.service.crear(this.model).subscribe({
      next: (params) => {
        //console.log('queryParams', params);
        this.model = params;
      },
      complete: () => {
        console.log('Creado');
        Swal.fire('Nuevo: ', `${this.nombreModel} ${this.model.nombre} creado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      },
      error: (e) => {
        if (e.status === 400) {
          this.error = e.error;
          console.log(this.error);
        }
      }
    });
  }

  public editar(): void {
    this.service.editar(this.model).subscribe({
      next: (params) => {
        this.model = params;
      },
      complete: () => {
        Swal.fire('Modificado: ', `${this.nombreModel} ${this.model.nombre} actualizado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      },
      error: (e) => {
        if (e.status === 400) {
          this.error = e.error;
          console.log(this.error);
        }
      }
    });
  }

}
