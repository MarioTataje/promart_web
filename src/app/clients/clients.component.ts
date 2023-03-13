import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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

    data.afterClosed().subscribe((clientData: any) => {
      if (clientData) {
        clientData.fecha_nacimiento = this.formatDate(clientData.fecha_nacimiento);
        const verify = this.validateDate(clientData.fecha_nacimiento, clientData.edad);
        if(verify){
          this._clientsService.createClient(clientData).subscribe({
            next: () => this.getClients(),
            error: () => this._snackBar.open(
              'No se ha podido crear el cliente. Intente nuevamente', 'Entendido'
            ),
          });
        } else {
          this._snackBar.open(
            'No se ha podido crear el cliente porque la edad y la fecha de nacimiento no concuerdan', 'Entendido'
          )
        }
      }
    });
  }

  kpiClients(): void {
    this._clientsService.getKPI().subscribe({
      next: (response) => {
        this._dialog.open(KpiModalComponent, {
          width: '40%',
          panelClass: 'no-padding-panel',
          data: {
            isUpdate: true,
            info: response
          }
        });
      },
      error: () => this._snackBar.open('La operación ha fallado. Intente nuevamente', 'Entendido'),
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  validateDate(birthDateString: String, age: Number): Boolean {

    const currentMoment = moment();
    const birthday = birthDateString.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1");
    const birthMoment = moment(birthday, "YYYY-MM-DD");
    const ageDiff: any = currentMoment.diff(birthMoment, 'years');
    const verifyAge = parseInt(ageDiff);

    if (verifyAge !== age){
      return false;
    }
    return true;
  }
}
