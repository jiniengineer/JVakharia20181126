import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ModalComponent } from '../modal/modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { effects, reducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { OrderResolver } from './services/resolvers/order.resolver.service';
import { OrdersGuard } from './services/guards/orders.guard';

@NgModule({
  declarations: OrdersRoutingModule.components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    NgbModalModule,
    StoreModule.forFeature('orderModule', reducers),
    EffectsModule.forFeature(effects),
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    OrderResolver,
    OrdersGuard
  ]
})
export class OrdersModule { }
