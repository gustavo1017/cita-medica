import { Appointment } from "./Appointment";

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
}