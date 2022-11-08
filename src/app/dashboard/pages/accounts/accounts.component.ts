import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IAccount } from 'src/app/models/iAccounts';
import { IContacts } from 'src/app/models/iContacts';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];

  dataSource!: MatTableDataSource<IAccount>;
  displayColumns: string[] = ['name', 'type', 'phone', 'agent'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AccountService) {}

  ngOnInit(): void {
    this.service.allAccounts().subscribe((data: any) => {
      this.accounts = data;

      console.log(this.accounts);

      this.dataSource = new MatTableDataSource(this.accounts);
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
}
