import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Vehicle } from '../../../../core/interfaces/vehicle.interface';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  @Input() vehicle: Vehicle | null = null;
  @Input() isSubmitting = false;
  @Output() vehicleSubmit = new EventEmitter<Vehicle>();
  @Output() cancel = new EventEmitter<void>();
  usageTypes = ['personal', 'work', 'cargo'];

  vehicleForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2030)]],
      usage_type: [''],
    });
  }

  ngOnInit() {
    if (this.vehicle) {
      this.isEditMode = true;
      this.vehicleForm.patchValue({
        brand: this.vehicle.brand,
        model: this.vehicle.model,
        year: this.vehicle.year,
        usage_type: this.vehicle.usage_type,
      });
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      const formValue = this.vehicleForm.value;
      let request: Vehicle;
      if (this.isEditMode && this.vehicle?.vehicle_id) {
        request = {
          vehicle_id: this.vehicle.vehicle_id,
          ...formValue
        };
      } else {
        request = formValue;
      }
      this.vehicleSubmit.emit(request);
    } else {
      Object.keys(this.vehicleForm.controls).forEach(key => {
        const control = this.vehicleForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
