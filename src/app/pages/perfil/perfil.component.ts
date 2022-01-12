import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, switchMap } from 'rxjs';
import { Rol } from 'src/app/_model/rol';
import { Usuario } from 'src/app/_model/usuario';
import { RolService } from 'src/app/_service/rol.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  rolService: RolService;
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatSort) sort: MatSort;

  usr_name: string;
  roles: Rol[] = [];
  roles$: Observable<Rol>;
  rol = new Rol();

  constructor(
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {

    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let tokenDecodificado = helper.decodeToken(token);
    this.usr_name = tokenDecodificado.user_name;
    this.rol.nombre = '';

    this.usuarioService.listar().subscribe((data) => {

      let usr = new Usuario();
      data.forEach(obj =>{
        usr.username = obj.username;
        if (usr.username === this.usr_name) {
          for (let x of obj.roles) {
            this.rol.nombre += x.nombre += ' - ';
          }
        }
      });


    });
  }

}
