import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../../modal/modal.component';
import { IOrder } from '../../models/order.model';
import { getAllOrders, getError, OrderModuleState,
  LoadOrders, LoadOrder, DeleteOrder } from '../../state/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orders$: Observable<IOrder[]>;
  error$: Observable<string>;
  constructor(private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<OrderModuleState>) { }

  ngOnInit() {
    this.loadOrders();
  }

  ordersTrackByFn  = (index: number, order: IOrder) => order.id;

  loadOrders() {
    this.store.dispatch(new LoadOrders());
    this.orders$ = this.store.pipe(select(getAllOrders));
    this.error$ = this.store.pipe(select(getError));
  }

  addOrder() {
    this.router.navigateByUrl(`/orders/add`);
  }

  editOrder(order: IOrder) {
    this.store.dispatch(new LoadOrder(order.id));
    this.router.navigateByUrl(`/orders/edit/${order.id}`);
  }

  displayConfirmationModal(order: IOrder) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.body = 'Are you sure you want to delete this record?';
    modalRef.componentInstance.primaryBtnText = 'Yes';
    modalRef.componentInstance.tertiaryBtnText = 'No';
    modalRef.result.then(() => {
      this.deleteOrder(order);
    }).catch((error) => {
      throwError(error);
    });
  }

  deleteOrder(order: IOrder) {
    this.store.dispatch(new DeleteOrder(order.id));
  }

}
