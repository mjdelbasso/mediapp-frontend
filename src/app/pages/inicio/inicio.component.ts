import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/_service/menu.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/_service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: string;

  constructor(
    private menuService: MenuService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(!this.loginService.estaLogueado()){
      sessionStorage.clear();
      this.router.navigate(['']);
    }

    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let tokenDecodificado = helper.decodeToken(token);
    this.usuario = tokenDecodificado.user_name;

    this.menuService.listarPorUsuario(this.usuario).subscribe(data => {
    this.menuService.setMenuCambio(data);
    });
  }

}
