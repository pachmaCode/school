import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporativoComponent } from './corporativo.component';


const routes: Routes = [
  {
    path: '',
    component: CorporativoComponent,
    data: {
      title: 'Corporativo'
    }
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativoRoutingModule { }
