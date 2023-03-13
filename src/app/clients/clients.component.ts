import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from './clients.interface';
import { ClientsService } from './clients.service';
import { ClientModalComponent } from './modals/client-modal/client-modal.component';
import { KpiModalComponent } from './modals/kpi-modal/kpi-modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  displayedColumns: string[] = [];

  constructor(
    private _clientsService: ClientsService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'nombre', 'apellido', 'edad', 'fecha_nacimiento', 'fecha_probable_muerte'];
    this.getClients();
  }

  getClients(): void {
    this._clientsService.getClients().subscribe({
      next: (response) => this.clients = response,
      error: () => this._snackBar.open('La operación ha fallado. Intente nuevamente', 'Entendido'),
    });
  }

  addClient(): void {
    const data = this._dialog.open(ClientModalComponent, {
      width: '40%',
      panelClass: 'no-padding-panel',
      data: {
        isUpdate: false,
        info: null
      }
    });

    data.afterClosed().subscribe((clientData: Partial<Client>) => {
      if (clientData) {
        this._clientsService.createClient(clientData).subscribe({
          next: () => this.getClients(),
          error: () => this._snackBar.open(
            'No se ha podido crear la categoría. Intente nuevamente', 'Entendido'
          ),
        });
      }
    });
  }

  kpiClients(): void {
    this._dialog.open(KpiModalComponent, {
      width: '40%',
      panelClass: 'no-padding-panel',
      data: {
        isUpdate: false,
        info: null
      }
    });
  }

}
