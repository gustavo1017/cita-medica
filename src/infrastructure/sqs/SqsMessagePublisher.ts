import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { MessagePublisher } from "../../domain/MessagePublisher";

const sqs = new SQSClient({});

export class SqsMessagePublisher implements MessagePublisher {
  async publish(message: object, countryISO: string): Promise<void> {
    let queueUrl;
    if (countryISO === "PE") queueUrl = process.env.SQS_PE_URL!;
    else if (countryISO === "CL") queueUrl = process.env.SQS_CL_URL!;
    else throw new Error("countryISO no soportado");

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(message),
      })
    );
  }
}