import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.css']
})
export class NuevoPacienteComponent implements OnInit {

  paciente: Paciente;

  constructor(
    private dialogRef: MatDialogRef<NuevoPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Paciente,
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.paciente = { ...this.data };
  }

  operar() {
        this.pacienteService.registrar(this.paciente).pipe(switchMap( () => {
        return this.pacienteService.listar();
      }))
      .subscribe(data => {
        this.pacienteService.setPacienteCambio(data);
        this.snackBar.open('Se registraron los datos', 'Aviso', { duration: 3000 });
      });

    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
