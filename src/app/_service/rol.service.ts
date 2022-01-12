import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../_model/rol';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class RolService extends GenericService<Rol>{

  private RolCambio = new Subject<Rol[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/usuarios`);
  }

  /* get, set */
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setRolCambio(lista: Rol[]) {
    this.RolCambio.next(lista);
  }

  getRolCambio() {
    return this.RolCambio.asObservable();
  }
}
