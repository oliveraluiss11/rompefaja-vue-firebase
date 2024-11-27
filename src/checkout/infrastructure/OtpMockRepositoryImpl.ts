import axiosInstance from '@/axiosInstance'
import type { GenerateOtpRequest } from '../domain/model/GenerateOtpRequest'
import type { OtpRepository } from '../domain/repository/OtpRepository'

export const otpMockRepositoryImpl: OtpRepository = {
  generateOtp: async function (generateOtp: GenerateOtpRequest): Promise<void> {
    try {
      // Envía el objeto `generateOtp` como cuerpo de la solicitud
      const response = await axiosInstance.post(
        '/v3/de4c6ca0-7552-4407-86fc-efbeb8304acc',
        generateOtp, // Aquí va el body
      )

      if (response.status !== 200) {
        throw new Error('Error al generar el OTP')
      }

      alert('Se envió el código Otp')
    } catch (error) {
      console.error('Error en generateOtp:', error)
      throw error
    }
  },
}
