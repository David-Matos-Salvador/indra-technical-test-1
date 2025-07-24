import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { VehicleListComponent } from './vehicle-list.component';
import { Vehicle } from '../../models/vehicle.model';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VehicleListComponent,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatDividerModule,
        MatBadgeModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty state when no vehicles', () => {
    component.vehicles = [];
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should display vehicles when provided', () => {
    const mockVehicles: Vehicle[] = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2023 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2022 }
    ];

    component.vehicles = mockVehicles;
    fixture.detectChanges();

    const vehicleCards = fixture.nativeElement.querySelectorAll('.vehicle-card');
    expect(vehicleCards.length).toBe(2);
  });

  it('should emit edit event when edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    const mockVehicle: Vehicle = { id: '1', brand: 'Toyota', model: 'Corolla', year: 2023 };

    component.onEdit(mockVehicle);

    expect(component.edit.emit).toHaveBeenCalledWith(mockVehicle);
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const mockVehicle: Vehicle = { id: '1', brand: 'Toyota', model: 'Corolla', year: 2023 };

    component.onDelete(mockVehicle);

    expect(component.delete.emit).toHaveBeenCalledWith(mockVehicle);
  });

  it('should format date correctly', () => {
    const dateString = '2023-12-25T10:30:00Z';
    const formattedDate = component.formatDate(dateString);

    expect(formattedDate).toContain('Dec');
    expect(formattedDate).toContain('25');
    expect(formattedDate).toContain('2023');
  });

  it('should track vehicles by id', () => {
    const mockVehicle: Vehicle = { id: '123', brand: 'Toyota', model: 'Corolla', year: 2023 };
    const trackResult = component.trackByVehicleId(0, mockVehicle);

    expect(trackResult).toBe('123');
  });

  it('should track vehicles by index when no id', () => {
    const mockVehicle: Vehicle = { brand: 'Toyota', model: 'Corolla', year: 2023 };
    const trackResult = component.trackByVehicleId(5, mockVehicle);

    expect(trackResult).toBe('5');
  });
});