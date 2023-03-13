import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kpi-modal',
  templateUrl: './kpi-modal.component.html',
  styleUrls: ['./kpi-modal.component.scss']
})
export class KpiModalComponent implements OnInit {

  kpiForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<KpiModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.kpiForm = this.fb.group({
      promedio_edad: [this.data.info.promedio_edad],
      desviacion_estandar: [this.data.info.desviacion_estandar]
    });
  }

  onClose(data: any): void {
    this.dialogRef.close(data);
  }

}
