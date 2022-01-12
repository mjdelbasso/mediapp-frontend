import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consulta } from '../_model/consulta';
import { ConsultaListaExamenDTO } from '../_model/consultaListaExamenDTO';
import { FiltroConsultaDTO } from '../_model/filtroConsultaDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url: string = `${environment.HOST}/consultas`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscarFecha(fecha1: string, fecha2: string) {
    return this.http.get<Consulta[]>(`${this.url}/buscar?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  buscarOtros(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Consulta[]>(`${this.url}/buscar/otros`, filtroConsulta);
  }

  listarExamenPorConsulta(idConsulta: number) {
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
  }

  listarResumen() {
    return this.http.get<any[]>(`${this.url}/listarResumen`);
  }

  //pdfs
  generarReporte() {
    return this.http.get(`${this.url}/generarReporte`, { responseType: 'blob' });
  }

  //archivos
  subirArchivo(data: File) {
    let formdata: FormData = new FormData();
    formdata.append('adjunto', data);
    return this.http.post(`${this.url}/guardarArchivo`, formdata);
  }

  leerArchivo() {
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }

}
