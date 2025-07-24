export type UsageType = 'personal' | 'work' | 'cargo';

export interface Vehicle {
  vehicle_id: string;
  customer_id: string;
  brand: string;
  model: string;
  year: number;
  usage_type: UsageType;
  created_at?: string;
}

export interface VehicleWithEstimatedPremium extends Vehicle {
  estimated_premium?: number;
}
