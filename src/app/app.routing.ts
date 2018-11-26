import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/errors/components/error.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'orders' },
  { path: 'orders', loadChildren: './features/orders/orders.module#OrdersModule' },
  { path: 'about', loadChildren: './features/about/about.module#AboutModule' },
  { path: '**', component: ErrorComponent }
];
