import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms'
import { CorporativoRoutingModule } from "./corporativo-routing.module";

import { CorporativoComponent } from "./corporativo.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PipeModule } from "../shared/pipes/pipe.module";

@NgModule({
  imports: [
    CommonModule,
    CorporativoRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    PipeModule
  ],
  exports: [],
  declarations: [
    CorporativoComponent
  ],
  providers: [DatePipe],
})
export class CorporativoModule { }
