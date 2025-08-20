export interface Appointment {
  id: string;
  insuredId: string;
  scheduleId: number;
  countryISO: string;
  status: "pending" | "confirmed" | "cancelled";
}