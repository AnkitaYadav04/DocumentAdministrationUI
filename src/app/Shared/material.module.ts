import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
const modules = [
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule

]
@NgModule({
  imports: [
    ...modules
  ],
  exports : [
    ...modules
  ]
})
export class MaterialModule { }
