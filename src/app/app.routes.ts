import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { StationProfile } from './pages/station-profile/station-profile';
import { Contracts } from './pages/contracts/contracts';
import { Earnings } from './pages/earnings/earnings';
import { Staff } from './pages/staff/staff';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'station-profile', component: StationProfile },
  { path: 'contracts', component: Contracts },
  { path: 'earnings', component: Earnings },
  { path: 'staff', component: Staff },
];

