export interface Quotation {
  quotation_id: string;
  customer_id: string;
  vehicle_id: string;
  quotation_date: string;
  total_premium: number;
  created_at?: string;
}
