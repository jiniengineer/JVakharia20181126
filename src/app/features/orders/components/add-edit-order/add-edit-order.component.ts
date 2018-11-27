import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CryptoService } from '../../services/crypto.service';
import { CurrencyType } from '../../models/currency-type';
import { IOrder, Order } from '../../models/order.model';
import * as orderActions from '../../state/actions/order.action';
import {
  OrderModuleState,
  LoadCurrencyTypes,
  getFilteredCurrencies }
  from '../../state/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrls: ['./add-edit-order.component.scss']
})
export class AddEditOrderComponent implements OnInit, AfterContentChecked {
  orderForm: FormGroup;
  addMode = true;
  currencyTypes$: Observable<CurrencyType[]>;
  operationText = 'Create';
  id: number = undefined;
  order: IOrder;

  constructor(
    private fb: FormBuilder,
    private cryptoService: CryptoService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<OrderModuleState>) { }

  ngOnInit() {
    this.orderForm = this.fb.group( {
      id : null,
      merchantName: ['', Validators.compose([Validators.required])],
      invoiceAmount: ['', Validators.compose([Validators.required])],
      itemName: ['', Validators.compose([Validators.required])],
      currencyType: ['', Validators.compose([Validators.required])],
      price: [0],
      totalAmount: [0]
    });

    const order = this.route.snapshot.data['order'];
    if (order && order.id) {
      this.addMode = false;
      this.operationText = 'Update';
      this.orderForm.patchValue(order);
    }
    this.getCryptoCurrencyTypes();
  }

  ngAfterContentChecked()  {
    const price = this.orderForm.get('price').value;
    const invoiceAmount = this.orderForm.get('invoiceAmount').value;
    const total = (price && invoiceAmount) ? +(price * invoiceAmount).toFixed(2) : 0;
    // console.log(`Invoice Amt: ${invoiceAmount} Price is: ${price} Total is: ${total}`);
    this.orderForm.get('totalAmount').setValue(total);
  }

  currencyTypesTrackByFn  = (index: number, currencyType: CurrencyType) => currencyType.symbol;

  get f() { return this.orderForm.controls; }

  getCryptoCurrencyTypes() {
    this.store.dispatch(new LoadCurrencyTypes());
    this.currencyTypes$ = this.store.pipe(select(getFilteredCurrencies));
  }

  onCurrencyTypeChange(event) {
    if (event.length > 0) {
      const value = event.split(':');
      const id = value[0];
      try {
        this.cryptoService.getCryptoPrice(id).subscribe(data => {
          this.orderForm.get('price').setValue(data);
        });
      } catch (error) {
        throw error;
      }
    } else {
      this.orderForm.get('price').setValue(0);
    }
  }

  saveOrder() {
    if (this.orderForm.valid) {
      const order: Order = new Order(this.orderForm.value);
      if (this.addMode) {
        this.store.dispatch(new orderActions.CreateOrder(order));
      } else {
        this.store.dispatch(new orderActions.UpdateOrder(order));
      }
      this.goToDashboard();
    }
  }

  goToDashboard() {
    this.orderForm.markAsPristine();
    this.router.navigate(['/']);
  }

}
