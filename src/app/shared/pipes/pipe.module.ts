import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { FechaPipe } from './fecha.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe, FechaPipe],
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe, FechaPipe]
})

export class PipeModule{}
