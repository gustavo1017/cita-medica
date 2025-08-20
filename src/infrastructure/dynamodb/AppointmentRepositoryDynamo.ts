import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Appointment } from "../../domain/Appointment";
import { AppointmentRepository } from "../../domain/AppointmentRepository";
import { docClient } from "../../shared/db";

export class AppointmentRepositoryDynamo implements AppointmentRepository {
  private tableName = process.env.APPOINTMENT_TABLE!;

  async save(appointment: Appointment): Promise<void> {
    await docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: appointment,
      })
    );
  }
}