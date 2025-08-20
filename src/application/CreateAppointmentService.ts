import { v4 as uuid } from "uuid";
import { Appointment } from "../domain/Appointment";
import { AppointmentRepository } from "../domain/AppointmentRepository";

interface CreateAppointmentRequest {
  insuredId: string;
  scheduleId: number;
  countryISO: string;
}

export class CreateAppointmentService {
  constructor(private repository: AppointmentRepository) {}

  async execute(request: CreateAppointmentRequest): Promise<Appointment> {
    const appointment: Appointment = {
      id: uuid(),
      insuredId: request.insuredId,
      scheduleId: request.scheduleId,
      countryISO: request.countryISO,
      status: "pending",
    };

    await this.repository.save(appointment);
    return appointment;
  }
}