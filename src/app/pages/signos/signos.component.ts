import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from 'src/app/_service/signos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/_service/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SignosDialogoComponent } from './signos-dialogo/signos-dialogo.component';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  dataSource: MatTableDataSource<Signos>;
  displayedColumns: string[] = ['paciente','fecha','temperatura','pulso','ritmo','acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number;
  usuario: string;
  constructor(
    private signosService : SignosService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private dialog: MatDialog

    ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let tokenDecodificado = helper.decodeToken(token);
    this.usuario = tokenDecodificado.user_name;

    this.menuService.listarPorUsuario(this.usuario).subscribe(data => {
      this.menuService.setMenuCambio(data);
    });

    this.signosService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.signosService.getSignosCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

      this.signosService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });

  }

  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  abrirDialogo(signos?: Signos) {
    this.dialog.open(SignosDialogoComponent, {
      width: '250px',
      data: signos
    });
  }


  eliminar(idSignos: number){
    this.signosService.eliminar(idSignos).subscribe(() => {
      this.signosService.listar().subscribe(data => {
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE ELIMINO' );
      });
      this.signosService.listar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

    });
  }

  mostrarMas(e: any){
    this.signosService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });
  }

  verificarHijos(){
    return this.route.children.length !== 0
  }
}

