import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditOrderComponent } from './components/add-edit-order/add-edit-order.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalComponent } from '../modal/modal.component';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
import { OrderResolver } from './services/resolvers/order.resolver.service';
import { OrdersGuard } from './services/guards/orders.guard';
import { CurrencyTypesResolver } from './services/resolvers/currency-type.resolver.service';

const orderRoutes: Routes = [
  {
    path: '',
    canActivate: [OrdersGuard],
    component: DashboardComponent
  },
  {
    path: 'add',
    component: AddEditOrderComponent,
    resolve: {
      currencyTypes: CurrencyTypesResolver
    }
  },
  {
    path: 'edit/:id',
    component: AddEditOrderComponent,
    resolve: {
      order: OrderResolver,
      currencyTypes: CurrencyTypesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})

export class OrdersRoutingModule {
  static components = [
    DashboardComponent,
    AddEditOrderComponent,
    ModalComponent,
    NumbersOnlyDirective
  ];
}
