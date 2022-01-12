import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Consulta } from 'src/app/_model/consulta';
import { FiltroConsultaDTO } from 'src/app/_model/filtroConsultaDTO';
import { ConsultaService } from 'src/app/_service/consulta.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { BuscarDialogoComponent } from './buscar-dialogo/buscar-dialogo.component';
import { LoginService } from 'src/app/_service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tab') tab: MatTabGroup;


  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.loginService.estaLogueado()){
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta1': new FormControl(''),
      'fechaConsulta2': new FormControl(''),
    });
  }

  buscar() {

    if (this.tab.selectedIndex == 0) {
      let dni = this.form.value['dni'];
      let nombreCompleto = this.form.value['nombreCompleto'];

      let filtro = new FiltroConsultaDTO(dni, nombreCompleto.toLowerCase());

      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }

      this.consultaService.buscarOtros(filtro).subscribe(data => this.crearTabla(data));
    } else {
      let fecha1 = this.form.value['fechaConsulta1'];
      fecha1 = moment(fecha1).format('YYYY-MM-DDTHH:mm:ss');
      let fecha2 = this.form.value['fechaConsulta2'];
      fecha2 = moment(fecha2).format('YYYY-MM-DDTHH:mm:ss');

      this.consultaService.buscarFecha(fecha1, fecha2).subscribe(data => this.crearTabla(data));
    }
  }

  crearTabla(data: Consulta[]) {
    console.log(data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verDetalle(consulta: Consulta) {
    this.dialog.open(BuscarDialogoComponent, {
      width: '750px',
      data: consulta
    });
  }

}
