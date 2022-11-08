import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IOpportunity } from 'src/app/models/iOpportunity';
import { OppoService } from '../../service/oppo.service';

@Component({
  selector: 'app-single-oppo',
  templateUrl: './single-oppo.component.html',
  styleUrls: ['./single-oppo.component.scss'],
})
export class SingleOppoComponent implements OnInit {
  oppo!: IOpportunity;
  oppoId: any;

  oppoForm!: FormGroup;
  closeResult = '';

  loading: boolean = false;

  constructor(
    private service: OppoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private modalService: NgbModal
  ) {
    this.oppoId = this.route.snapshot.paramMap.get('id');

    this.oppoForm = this.fb.group({
      stage: ['', Validators.required],
      close_date: ['', Validators.required],
      property: ['', Validators.required],
      amount: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.singleOppo(this.oppoId);
  }

  singleOppo(id: any) {
    this.service.singleOppo(id).subscribe((data: any) => {
      this.oppo = data;
      this.oppoForm.patchValue(this.oppo);
    });
  }

  updateOppo() {
    this.loading = true;
    if (this.oppoForm.invalid) {
      this.loading = false;
      this.oppoForm.markAllAsTouched();
      return;
    }

    console.log(this.oppoId);

    this.service.updateOppo(this.oppoId, this.oppoForm.value).subscribe(
      () => {
        this.modalService.dismissAll();
        this.snackbar.open('Opportunity Updated Successfully', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      (err: any) => {
        (this.loading = false),
          this.snackbar.open('Error Updating Opportunity', 'Retry', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
      }
    );
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
