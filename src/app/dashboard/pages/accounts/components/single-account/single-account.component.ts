import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from 'src/app/models/iAccounts';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.scss'],
})
export class SingleAccountComponent implements OnInit {
  account!: IAccount;
  accountId: any;

  constructor(private route: ActivatedRoute, private service: AccountService) {
    this.accountId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDetails(this.accountId);
  }

  getDetails(id: string) {
    this.service.singleAccount(id).subscribe((data: any) => {
      this.account = data;
    });
  }
}
