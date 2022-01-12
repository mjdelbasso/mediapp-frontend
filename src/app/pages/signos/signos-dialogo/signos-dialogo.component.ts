import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-signos-dialogo',
  templateUrl: './signos-dialogo.component.html',
  styleUrls: ['./signos-dialogo.component.css']
})
export class SignosDialogoComponent implements OnInit {

  signos: Signos;

  constructor(
    private dialogRef: MatDialogRef<SignosDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Signos,
    private signosService: SignosService
  ) { }

  ngOnInit(): void {
    this.signos = { ...this.data };
  }

  operar() {
    if (this.signos != null && this.signos.idSignos > 0) {
      //MODIFICAR
      this.signosService.modificar(this.signos).subscribe(() => {
        this.signosService.listar().subscribe(data => {
          this.signosService.setSignosCambio(data);
          this.signosService.setMensajeCambio('SE MODIFICÓ');
        });
      });
    }else{
      //REGISTRAR
      this.signosService.registrar(this.signos).pipe(switchMap( () => {
        return this.signosService.listar();
      }))
      .subscribe(data => {
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE REGISTRÓ');
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
