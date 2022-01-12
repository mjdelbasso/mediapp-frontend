import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { Signos } from 'src/app/_model/signos';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from 'src/app/_service/signos.service';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})

export class SignosEdicionComponent implements OnInit {
  id: number;
  edicion: boolean;


  cantidad: number;
  pacientes: Paciente[];
  paciente: Paciente;
  pacientes$: Observable<Paciente[]>;
  maxFecha: Date = new Date();
  temperatura: string;
  pulso: string;
  ritmo: string;
  review_btn: boolean;


  detalleSignos: Signos [] = [];

  idPacienteSeleccionado: number;
  fechaSeleccionada: Date = new Date();

  constructor(
    private pacienteService: PacienteService,
    private signosService: SignosService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
    this.listarInicial();
  }

  listarInicial() {
    this.pacientes$ = this.pacienteService.listar();


  }

  abrirDialogo(paciente?: Paciente) {
      this.dialog.open(NuevoPacienteComponent, {
      width: '250px',
      data: paciente,

    }).afterClosed().subscribe(() =>{
      this.listarInicial();
    });
  }

  aceptar() {
    if (this.temperatura && this.pulso && this.ritmo ) {
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;


    let signos = new Signos();
    signos.paciente = paciente;
    signos.pulso = this.pulso;
    signos.ritmo = this.ritmo;
    signos.temperatura = this.temperatura;
    signos.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');


    this.signosService.registrar(signos).subscribe(() => {

      this.snackBar.open('Se registraron los datos', 'Aviso', { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();

      }, 2000);

    });
} else {
      this.snackBar.open('Debe agregar temperatura, pulso y ritmo cardiaco', 'Aviso', { duration: 2000 });
    }

}

  limpiarControles() {
    this.detalleSignos = [];
    this.pulso = null;
    this.ritmo = null;
    this.temperatura = null;
    this.idPacienteSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.router.navigate(['/pages/signos']).then(() => {
      window.location.reload();
    });

    }

  }



