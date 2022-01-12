import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']  
})
export class MedicoDialogoComponent implements OnInit {

  medico: Medico;

  constructor(
    private dialogRef: MatDialogRef<MedicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private medicoService: MedicoService  
  ) { }

  ngOnInit(): void {
    this.medico = { ...this.data };
  }

  operar() {
    if (this.medico != null && this.medico.idMedico > 0) {
      //MODIFICAR
      this.medicoService.modificar(this.medico).subscribe(() => {
        this.medicoService.listar().subscribe(data => {
          this.medicoService.setMedicoCambio(data);
          this.medicoService.setMensajeCambio('SE MODIFICÓ');
        });
      });
    }else{
      //REGISTRAR
      this.medicoService.registrar(this.medico).pipe(switchMap( () => {
        return this.medicoService.listar();
      }))
      .subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('SE REGISTRÓ');
      });
    }
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
    /*this.dialogRef.afterClosed().subscribe(result => {
      console.log('cerrar');
    });*/  
  }

}
