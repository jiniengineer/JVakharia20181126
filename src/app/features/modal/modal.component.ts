import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {}

  onConfirm() {
    this.modal.close(true);
  }

}
