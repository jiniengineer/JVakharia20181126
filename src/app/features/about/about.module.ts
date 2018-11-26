import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [ AboutRoutingModule.components ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
