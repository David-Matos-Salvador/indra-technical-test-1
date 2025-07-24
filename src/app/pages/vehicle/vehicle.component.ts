import { Component, DestroyRef, signal } from '@angular/core';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { Vehicle } from '../../core/interfaces/vehicle.interface';
import { VehicleService } from '../../shared/services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin',
  imports: [
    VehicleFormComponent,
    VehicleListComponent,
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {
  vehicles = signal<Vehicle[]>([]);
  selectedVehicle = signal<Vehicle | null>(null);
  showForm = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private destroRef: DestroyRef,
  ) { }

  ngOnInit() {
    this.vehicleService.vehicles$
      .pipe(takeUntilDestroyed(this.destroRef))
      .subscribe(vehicles => {
        this.vehicles.set(vehicles);
      });
  }

  onVehicleSubmit(vehicleData: Vehicle) {
    this.isSubmitting.set(true);
    if ('vehicle_id' in vehicleData) {
      // Actualizar vehículo existente
      this.vehicleService.updateVehicle(vehicleData).subscribe({
        next: (result) => {
          this.isSubmitting.set(false);
          if (result) {
            this.showSnackBar('✅ Vehicle updated successfully', 'success');
            this.selectedVehicle.set(null);
            this.showForm.set(false);
          } else {
            this.showSnackBar('❌ Error updating vehicle', 'error');
          }
        },
        error: () => {
          this.isSubmitting.set(false);
          this.showSnackBar('❌ Error updating vehicle', 'error');
        }
      });
    } else {
      // Crear nuevo vehículo
      this.vehicleService.createVehicle(vehicleData).subscribe({
        next: (result) => {
          this.isSubmitting.set(false);
          if (result) {
            this.showSnackBar('✅ Vehicle created successfully', 'success');
          } else {
            this.showSnackBar('❌ Error creating vehicle', 'error');
          }
        },
        error: () => {
          this.isSubmitting.set(false);
          this.showSnackBar('❌ Error creating vehicle', 'error');
        }
      });
    }
  }

  onFormCancel() {
    this.selectedVehicle.set(null);
    this.showForm.set(false);
  }

  onEditVehicle(vehicle: Vehicle) {
    this.selectedVehicle.set(vehicle);
    this.showForm.set(true);
    this.scrollToForm();
  }

  onDeleteVehicle(vehicle: Vehicle) {
    if (confirm(`Are you sure you want to delete the vehicle ${vehicle.brand} ${vehicle.model} (${vehicle.year})?`)) {
      if (vehicle.vehicle_id) {
        this.vehicleService.deleteVehicle(vehicle.vehicle_id).subscribe({
          next: (success) => {
            if (success) {
              this.showSnackBar('✅ Vehicle deleted successfully', 'success');
            } else {
              this.showSnackBar('❌ Error deleting vehicle', 'error');
            }
          },
          error: () => {
            this.showSnackBar('❌ Error deleting vehicle', 'error');
          }
        });
      }
    }
  }

  scrollToForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }
}
