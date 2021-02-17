import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'corporativos',
    loadChildren: () => import('../../corporativos/corporativos.module').then(m => m.CorporativoListModule),
  },
  {
    path: 'corporativo/:id',
    loadChildren: () => import('../../corporativo/corporativo.module').then(m => m.CorporativoModule),
  }
];
