import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { Vehicle } from '../../../../core/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatChipsModule,
    MatDivider,
    MatBadgeModule,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  @Input() vehicles: Vehicle[] = [];
  @Output() edit = new EventEmitter<Vehicle>();
  @Output() delete = new EventEmitter<Vehicle>();
  @Output() add = new EventEmitter<void>();

  trackByVehicleId(index: number, vehicle: Vehicle): string {
    return vehicle.vehicle_id || index.toString();
  }

  onEdit(vehicle: Vehicle) {
    this.edit.emit(vehicle);
  }

  onDelete(vehicle: Vehicle) {
    this.delete.emit(vehicle);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
