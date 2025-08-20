import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { AppointmentRepositoryDynamo } from "../dynamodb/AppointmentRepositoryDynamo";
import { CreateAppointmentService } from "../../application/CreateAppointmentService";
import { SqsMessagePublisher } from "../sqs/SqsMessagePublisher";

const repository = new AppointmentRepositoryDynamo();
const sqs = new SqsMessagePublisher();
const service = new CreateAppointmentService(repository, sqs);

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: "Missing body" };
    }

    const body = JSON.parse(event.body);

    const appointment = await service.execute({
      insuredId: body.insuredId,
      scheduleId: body.scheduleId,
      countryISO: body.countryISO,
    });

    return {
      statusCode: 201,
      body: JSON.stringify(appointment),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};