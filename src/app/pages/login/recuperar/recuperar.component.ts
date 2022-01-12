import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  email: string;
  mensaje: string;
  error: string;

  constructor(
    private loginService: LoginService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  enviar(){
    this.loginService.enviarCorreo(this.email).subscribe(data => {
      if(data === 1){
        this.mensaje = "Se enviaron las indicaciones al correo."
        this.error = null
      }else{
        this.error = "El usuario ingresado no existe";
      }
    });
  }
}
