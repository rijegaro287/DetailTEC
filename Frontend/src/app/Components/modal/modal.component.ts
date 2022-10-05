import { Component, Input } from '@angular/core'
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  closeResult = ''
  @Input() options: NgbModalOptions
  @Input() showModalButtonText: string
  @Input() modalHeader: string
  @Input() footerButtonText?: string
  @Input() footerButtonCallback: () => void

  constructor(private modalService: NgbModal) {
    this.options = {}
    this.showModalButtonText = ''
    this.modalHeader = ''
    this.footerButtonCallback = () => this.close()
  }

  open = (content: any) => { this.modalService.open(content, this.options) }

  close = () => { this.modalService.dismissAll() }
}
