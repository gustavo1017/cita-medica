import { Appointment } from "./Appointment";
export interface AppointmentSqlRepository {
  save(appointment: Appointment): Promise<void>;
}