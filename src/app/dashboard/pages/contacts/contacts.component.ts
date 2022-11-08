import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  UntypedFormControl,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  map,
  Observable,
  ReplaySubject,
  startWith,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { IContacts } from 'src/app/models/iContacts';
import { ContactService } from './service/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];

  contactForm!: FormGroup;
  loading: boolean = false;

  closeResult = '';

  dataSource!: MatTableDataSource<IContacts>;
  displayColumns: string[] = ['name', 'phone', 'email', 'agent'];

  countryList!: [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  /** */

  constructor(
    private service: ContactService,
    private snacbar: MatSnackBar,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.contactForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherName: [''],
      phone: ['', Validators.required],
      email: [''],
      referral: [''],
    });
  }

  ngOnInit(): void {
    this.service.getContacts().subscribe((data: any) => {
      this.contacts = data;

      this.dataSource = new MatTableDataSource(this.contacts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  addContact() {
    this.service.addContact(this.contactForm.value).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.snacbar.open('Contact Added Succssfully', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }
}
