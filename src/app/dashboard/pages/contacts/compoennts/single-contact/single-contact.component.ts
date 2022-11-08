import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IContacts } from 'src/app/models/iContacts';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss'],
})
export class SingleContactComponent implements OnInit {
  contact!: IContacts;
  contactId: any;

  constructor(
    private route: ActivatedRoute,
    private service: ContactService,
    private snackbar: MatSnackBar
  ) {
    this.contactId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDetails(this.contactId);
  }

  getDetails(id: string) {
    this.service.singleContact(id).subscribe((data: any) => {
      this.contact = data;
      console.log(this.contact);
    });
  }
}
