import { Routes } from "@angular/router";
import { ClientsComponent } from './clients/clients.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
  { path: 'clients', pathMatch: 'full', title: resolveTitle('Clientes'), component: ClientsComponent },
  { path: 'not-found', pathMatch: 'full', title: resolveTitle('Página no encontrada'), component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

function resolveTitle(name: string): string {
  return name + ' - Promart'
}
