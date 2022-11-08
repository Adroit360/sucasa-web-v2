import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { ILeads } from 'src/app/models/iLeads';
import { LeadService } from './service/lead.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit {
  leadForm!: FormGroup;
  leads: any;

  loading: boolean = false;

  dataSource!: MatTableDataSource<ILeads>;
  displayColumns: string[] = ['name', 'phone', 'email', 'status', 'agent'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**Select Form */
  /** list of banks */
  myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  countries: any = [];

  constructor(
    private service: LeadService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

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
    });
  }

  ngOnInit(): void {
    this.getLeads();

    this.service.getCountries().subscribe((res: any) => {
      const result = res;
      result.forEach((element: any) => {
        if (element.idd['suffixes'])
          this.countries.push(`${element.flag} ${element.name.common}`);
      });
    });

    this.filteredOptions = this.leadForm.controls['country'].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || ''))
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLeads() {
    this.service.getLeads().subscribe((res: any) => {
      this.leads = res;
      console.log(this.leads);

      this.dataSource = new MatTableDataSource(this.leads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addLead() {
    this.loading = true;

    if (this.leadForm.invalid) {
      this.loading = false;
      this.leadForm.markAllAsTouched();
      return;
    }

    console.log(this.leadForm.value);

    this.service
      .addLoad({
        ...this.leadForm.value,
        country: this.leadForm.value.country.split(' ').slice(1).join(' '),
      })
      .subscribe(
        (res: any) => {
          console.log('res: ', res);
          this.loading = false;
          this.router.navigate([`/dashboard/leads/${res.leads._id}`]);
        },
        (err: any) => {
          this.loading = false;
          this.snackBar.open('Error Adding Leads', 'Retry', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }
      );
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((country: any) =>
      country.toLowerCase().includes(filterValue)
    );
  }
}
