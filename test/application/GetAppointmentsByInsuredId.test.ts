
import { Appointment } from "../../src/domain/Appointment";
import {GetAppointmentsByInsuredId} from "../../src/application/GetAppointmentsByInsuredId"

describe("GetAppointmentsByInsuredId", () => {
  const mockRepository = {
    findByInsuredId: jest.fn()
  };

  const useCase = new GetAppointmentsByInsuredId(mockRepository as any);

  it("should return appointments when repository returns data", async () => {
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        insuredId: "12345",
        scheduleId: 10,
        countryISO: "PE",
        status: "confirmed"
      }
    ];

    mockRepository.findByInsuredId.mockResolvedValue(mockAppointments);

    const result = await useCase.execute("12345");

    expect(result).toEqual(mockAppointments);
    expect(mockRepository.findByInsuredId).toHaveBeenCalledWith("12345");
  });

  it("should return empty array if no appointments are found", async () => {
    mockRepository.findByInsuredId.mockResolvedValue([]);

    const result = await useCase.execute("99999");

    expect(result).toEqual([]);
    expect(mockRepository.findByInsuredId).toHaveBeenCalledWith("99999");
  });

  it("should throw an error if repository throws", async () => {
    mockRepository.findByInsuredId.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute("12345")).rejects.toThrow("DB error");
  });
});