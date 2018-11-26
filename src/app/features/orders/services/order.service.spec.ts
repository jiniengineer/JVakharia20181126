import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import { FakeBackendService } from '../../../shared/services/fake-backend-service';
import { ToastrService } from 'ngx-toastr';

describe('OrderService', () => {
  let fakeBackendService: FakeBackendService;
  let toastrService: ToastrService;
  let service: OrderService;

  beforeEach(() => {
    fakeBackendService = new FakeBackendService();
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        FakeBackendService,
        ToastrService
      ]
    });
  });
  const addOrder = {
    id: null,
    merchantName: 'Macys',
    itemName: 'Shirt',
    currencyType: 'BCH',
    invoiceAmount: 1.23456677,
    price: 3450.55
  };

  const updateOrder = {
    id: 2,
    merchantName: 'Macys',
    itemName: 'Shirt',
    currencyType: 'BCH',
    invoiceAmount: 1.23456677,
    price: 3450.55
  };

  beforeEach(inject([OrderService, ToastrService], (order: OrderService, toastr: ToastrService) => {
    service = order;
    toastrService = toastr;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get orders successfully', () => {
    service.getOrders().subscribe(() => {
      expect(toastrService.success).toHaveBeenCalled();
    });
  });

  it('should get order by id', () => {
    service.getOrderById(4).subscribe((order) => {
      expect(order).not.toBeNull();
    });
  });

  it('should create order successfully', () => {
    service.createOrder(addOrder).subscribe(() => {
      expect(toastrService.success).toHaveBeenCalled();
    });
  });

  it('should update order successfully', () => {
    service.updateOrder(updateOrder).subscribe(() => {
      expect(toastrService.success).toHaveBeenCalled();
    });
  });

  it('should delete order successfully', () => {
    service.deleteOrder(4).subscribe(() => {
      expect(toastrService.success).toHaveBeenCalled();
    });
  });
});
