import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { MySqlAppointmentRepository } from "../mysql/MySqlAppointmentRepository";
import { GetAppointmentsByInsuredId } from "../../application/GetAppointmentsByInsuredId";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const insuredId = event.queryStringParameters?.insuredId;
    if (!insuredId) {
      return { statusCode: 400, body: JSON.stringify({ error: "insuredId is required" }) };
    }

    const repo = new MySqlAppointmentRepository();
    const useCase = new GetAppointmentsByInsuredId(repo);

    const appointments = await useCase.execute(insuredId);

    return {
      statusCode: 200,
      body: JSON.stringify(appointments),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};