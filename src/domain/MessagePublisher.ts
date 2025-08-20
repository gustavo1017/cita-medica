export interface MessagePublisher {
  publish(message: object, countryISO: string): Promise<void>;
}