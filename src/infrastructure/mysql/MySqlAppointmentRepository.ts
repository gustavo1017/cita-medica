
import mysql from "mysql2/promise";
import { Appointment } from "../../domain/Appointment";
import { AppointmentSqlRepository } from "../../domain/AppointmentSqlRepository ";

const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 5,
});

export class MySqlAppointmentRepository implements AppointmentSqlRepository {
  async save(appointment: Appointment): Promise<void> {
    await pool.execute(
      `INSERT INTO appointments (id, insuredId, scheduleId, countryISO, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        appointment.id,
        appointment.insuredId,
        appointment.scheduleId,
        appointment.countryISO,
        appointment.status,
      ]
    );
  }
}