import type { GenerateOtpRequest } from '../model/GenerateOtpRequest'

export interface OtpRepository {
  generateOtp(generateOtp: GenerateOtpRequest): Promise<void>
}
