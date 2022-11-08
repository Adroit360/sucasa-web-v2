import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../utils/modules/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { OpportunityComponent } from './pages/opportunity/opportunity.component';
import { SingleAccountComponent } from './pages/accounts/components/single-account/single-account.component';
import { SingleLeadsComponent } from './pages/leads/components/single-leads/single-leads.component';
import { SingleContactComponent } from './pages/contacts/compoennts/single-contact/single-contact.component';
import { SingleOppoComponent } from './pages/opportunity/components/single-oppo/single-oppo.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    AccountsComponent,
    ContactsComponent,
    LeadsComponent,
    OpportunityComponent,
    SingleAccountComponent,
    SingleLeadsComponent,
    SingleContactComponent,
    SingleOppoComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, ChartsModule],
})
export class DashboardModule {}
