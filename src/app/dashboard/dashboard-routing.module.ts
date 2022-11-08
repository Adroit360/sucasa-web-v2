import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { SingleAccountComponent } from './pages/accounts/components/single-account/single-account.component';
import { SingleContactComponent } from './pages/contacts/compoennts/single-contact/single-contact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleLeadsComponent } from './pages/leads/components/single-leads/single-leads.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { SingleOppoComponent } from './pages/opportunity/components/single-oppo/single-oppo.component';
import { OpportunityComponent } from './pages/opportunity/opportunity.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/page/:id', component: SingleAccountComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'leads/:id', component: SingleLeadsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contacts/:id', component: SingleContactComponent },
  { path: 'opportunity', component: OpportunityComponent },
  { path: 'opportunity/:id', component: SingleOppoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
