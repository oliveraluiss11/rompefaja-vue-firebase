import type { GenerateOtpRequest } from '../domain/model/GenerateOtpRequest'
import type { OtpRepository } from '../domain/repository/OtpRepository'

export interface GenerateOtpUseCase {
  execute(request: GenerateOtpRequest): Promise<void>
}

export const createGenerateOtpUseCase = (otpRepository: OtpRepository): GenerateOtpUseCase => ({
  async execute(request: GenerateOtpRequest): Promise<void> {
    if (!request.cellphone) {
      throw new Error('cellphone son requeridos')
    }

    // Delegar al repositorio
    await otpRepository.generateOtp(request)
  },
})
