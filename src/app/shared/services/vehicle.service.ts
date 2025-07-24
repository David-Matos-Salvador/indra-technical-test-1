import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Vehicle } from '../../core/interfaces/vehicle.interface';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);
  public vehicles$ = this.vehiclesSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {
    this.loadVehicles();
  }

  private loadVehicles(): void {
    this.getVehicles().subscribe(vehicles => {
      this.vehiclesSubject.next(vehicles);
    });
  }

  getVehicles(): Observable<Vehicle[]> {
    return from(
      this.supabaseService.client
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching vehicles:', response.error);
          return [];
        }
        return response.data || [];
      })
    );
  }

  getVehicleById(id: string): Observable<Vehicle | null> {
    return from(
      this.supabaseService.client
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching vehicle:', response.error);
          return null;
        }
        return response.data;
      })
    );
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle | null> {
    return from(
      this.supabaseService.client
        .from('vehicles')
        .insert([vehicle])
        .select()
        .single()
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error creating vehicle:', response.error);
          return null;
        }
        return response.data;
      }),
      tap(() => this.loadVehicles())
    );
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle | null> {
    const { vehicle_id, ...updateData } = vehicle;
    return from(
      this.supabaseService.client
        .from('vehicles')
        .update(updateData)
        .eq('vehicle_id', vehicle_id)
        .select()
        .single()
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error updating vehicle:', response.error);
          return null;
        }
        return response.data;
      }),
      tap(() => this.loadVehicles())
    );
  }

  deleteVehicle(id: string): Observable<boolean> {
    return from(
      this.supabaseService.client
        .from('vehicles')
        .delete()
        .eq('vehicle_id', id)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error deleting vehicle:', response.error);
          return false;
        }
        return true;
      }),
      tap(() => this.loadVehicles())
    );
  }
}
