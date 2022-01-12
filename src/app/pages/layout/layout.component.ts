import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Menu } from 'src/app/_model/menu';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];
  v:boolean;

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenuCambio().subscribe(data => {
      this.menus = data;
      });
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }

  validar(){

    }



}
