import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CorporativoListRoutingModule } from "./corporativos-routing.module";
import { CorporativoListComponent } from "./corporativos.component";
import { ReactiveFormsModule } from '@angular/forms'
import { PipeModule } from "../shared/pipes/pipe.module";

@NgModule({
  imports: [
    CommonModule,
    CorporativoListRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    PipeModule
  ],
  exports: [],
  declarations: [
    CorporativoListComponent
  ],
  providers: [],
})
export class CorporativoListModule { }
