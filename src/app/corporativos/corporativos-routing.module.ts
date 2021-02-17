import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporativoListComponent } from './corporativos.component';


const routes: Routes = [
  {
    path: '',
    component: CorporativoListComponent,
    data: {
      title: 'Corporativo'
    }
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativoListRoutingModule { }
