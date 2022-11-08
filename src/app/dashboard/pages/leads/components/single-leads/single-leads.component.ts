import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ILeads } from 'src/app/models/iLeads';
import { LeadService } from '../../service/lead.service';

@Component({
  selector: 'app-single-leads',
  templateUrl: './single-leads.component.html',
  styleUrls: ['./single-leads.component.scss'],
})
export class SingleLeadsComponent implements OnInit {
  lead!: ILeads;
  leadId: any;

  leadForm!: FormGroup;
  closeResult = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: LeadService,
    private modalService: NgbModal
  ) {
    this.leadId = this.route.snapshot.paramMap.get('id');

    this.leadForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherName: [''],
      phone: ['', Validators.required],
      cell: [''],
      email: ['', [Validators.required, Validators.email]],
      country: [''],
      notes: [''],
      isPartnership: [Boolean],
      isCompanty: [Boolean],
      address1: [''],
      address2: [''],
    });
  }

  ngOnInit(): void {
    this.singleLead(this.leadId);
  }

  singleLead(id: string) {
    this.service.singleLead(id).subscribe((data: any) => {
      this.lead = data;
      console.log(this.lead);
      this.leadForm.patchValue(this.lead);
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'Modal title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
