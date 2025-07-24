import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { VehicleFormComponent } from './vehicle-form.component';
import { Vehicle } from '../../models/vehicle.model';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VehicleFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.vehicleForm.get('brand')?.value).toBe('');
    expect(component.vehicleForm.get('model')?.value).toBe('');
    expect(component.vehicleForm.get('year')?.value).toBe('');
  });

  it('should set edit mode when vehicle is provided', () => {
    const mockVehicle: Vehicle = {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2023
    };

    component.vehicle = mockVehicle;
    component.ngOnInit();

    expect(component.isEditMode).toBe(true);
    expect(component.vehicleForm.get('brand')?.value).toBe('Toyota');
    expect(component.vehicleForm.get('model')?.value).toBe('Corolla');
    expect(component.vehicleForm.get('year')?.value).toBe(2023);
  });

  it('should emit vehicleSubmit when form is valid', () => {
    spyOn(component.vehicleSubmit, 'emit');

    component.vehicleForm.patchValue({
      brand: 'Honda',
      model: 'Civic',
      year: 2022
    });

    component.onSubmit();

    expect(component.vehicleSubmit.emit).toHaveBeenCalledWith({
      brand: 'Honda',
      model: 'Civic',
      year: 2022
    });
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should validate required fields', () => {
    const brandControl = component.vehicleForm.get('brand');
    const modelControl = component.vehicleForm.get('model');
    const yearControl = component.vehicleForm.get('year');

    expect(brandControl?.hasError('required')).toBe(true);
    expect(modelControl?.hasError('required')).toBe(true);
    expect(yearControl?.hasError('required')).toBe(true);
  });

  it('should validate year range', () => {
    const yearControl = component.vehicleForm.get('year');
    
    yearControl?.setValue(1800);
    expect(yearControl?.hasError('min')).toBe(true);

    yearControl?.setValue(2040);
    expect(yearControl?.hasError('max')).toBe(true);

    yearControl?.setValue(2020);
    expect(yearControl?.hasError('min')).toBe(false);
    expect(yearControl?.hasError('max')).toBe(false);
  });
});