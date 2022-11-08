import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOpportunity } from 'src/app/models/iOpportunity';
import { OppoService } from './service/oppo.service';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
})
export class OpportunityComponent implements OnInit {
  oppo!: any;

  dataSource!: MatTableDataSource<IOpportunity>;
  displayColumns: string[] = ['name', 'account', 'stage', 'payment', 'agent'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: OppoService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.service.allOppo().subscribe((res: any) => {
      this.oppo = res;
      console.log(this.oppo);

      this.dataSource = new MatTableDataSource(this.oppo);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
