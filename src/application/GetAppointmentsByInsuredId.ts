import { Appointment } from "../domain/Appointment";
import { MySqlAppointmentRepository } from "../infrastructure/mysql/MySqlAppointmentRepository";

export class GetAppointmentsByInsuredId {
  private repository: MySqlAppointmentRepository;

  constructor(repository: MySqlAppointmentRepository) {
    this.repository = repository;
  }

  async execute(insuredId: string): Promise<Appointment[]> {
    return this.repository.findByInsuredId(insuredId);
  }
}