import { AppointmentSqlRepository } from "../domain/AppointmentSqlRepository ";
import { Appointment } from "../domain/Appointment";

export class ProcessAppointmentMessageService {
  constructor(private readonly repository: AppointmentSqlRepository) {}

  async execute(message: Appointment): Promise<void> {
    const appointment: Appointment = {
      id: message.id,
      insuredId: message.insuredId,
      scheduleId: message.scheduleId,
      countryISO: message.countryISO,
      status: message.status
    }

    await this.repository.save(appointment);
  }
}