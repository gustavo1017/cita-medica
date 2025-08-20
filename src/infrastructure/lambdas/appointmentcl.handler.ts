import { SQSEvent, SQSHandler } from "aws-lambda";
import { MySqlAppointmentRepository } from "../mysql/MySqlAppointmentRepository";
import { ProcessAppointmentMessageService } from "../../application/ProcessAppointmentMessageService ";

const service = new ProcessAppointmentMessageService(
  new MySqlAppointmentRepository()
);

export const handler: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const message = JSON.parse(record.body);
      await service.execute(message);
    } catch (err) {
      throw err;
    }
  }
};