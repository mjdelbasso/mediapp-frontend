import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { BuscarComponent } from './buscar/buscar.component';
import { ConsultaEspecialComponent } from './consulta-especial/consulta-especial.component';
import { ConsultaWizardComponent } from './consulta-wizard/consulta-wizard.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { EspecialidadEdicionComponent } from './especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { ExamenEdicionComponent } from './examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './examen/examen.component';
import { InicioComponent } from './inicio/inicio.component';
import { MedicoComponent } from './medico/medico.component'
import { Not403Component } from './not403/not403.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReporteComponent } from './reporte/reporte.component';
import { NuevoPacienteComponent } from './signos/signos-edicion/nuevo-paciente/nuevo-paciente.component';
import { SignosEdicionComponent } from './signos/signos-edicion/signos-edicion.component';
import { SignosComponent } from './signos/signos.component';

export const routes: Routes = [
      { path: 'inicio', component: InicioComponent, canActivate: [GuardService]},

      { path: 'paciente', component: PacienteComponent, children: [
            { path: 'nuevo', component: PacienteEdicionComponent },
            { path: 'edicion/:id', component: PacienteEdicionComponent }
        ], canActivate: [GuardService]
    },

      { path: 'perfil', component: PerfilComponent, canActivate: [GuardService]},

      { path: 'signos', component: SignosComponent, children:[
        { path: 'nuevo', component: SignosEdicionComponent },
        { path: 'nuevo/paciente', component: NuevoPacienteComponent },
        { path: 'edicion/:id', component: SignosEdicionComponent }
    ], canActivate: [GuardService]
    },
    {
        path: 'examen', component: ExamenComponent, children: [
            { path: 'nuevo', component: ExamenEdicionComponent },
            { path: 'edicion/:id', component: ExamenEdicionComponent }
        ], canActivate: [GuardService]
    },
    {
        path: 'especialidad', component: EspecialidadComponent, children: [
            { path: 'nuevo', component: EspecialidadEdicionComponent },
            { path: 'edicion/:id', component: EspecialidadEdicionComponent }
        ], canActivate: [GuardService]
    },
    { path: 'medico', component: MedicoComponent, canActivate: [GuardService]},
    { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService]},
    { path: 'consulta-wizard', component: ConsultaWizardComponent, canActivate: [GuardService]},
    { path: 'consulta-especial', component: ConsultaEspecialComponent, canActivate: [GuardService]},
    { path: 'buscar', component: BuscarComponent, canActivate: [GuardService]},
    { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
    { path: 'not-403', component: Not403Component}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
