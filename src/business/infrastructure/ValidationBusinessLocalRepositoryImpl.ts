import type { BusinessRepository } from '../domain/repository/ValidationBusinessRepository'

export const validationBusinessLocalRepositoryImpl: BusinessRepository = {
  isBusinessClosed: () => {
    // Obtener la fecha y hora actual en la zona horaria de Lima (Perú)
    const now = new Date()

    // Si la bandera está habilitada, pero estamos fuera del horario específico, el negocio sigue cerrado
    const isEnabled = import.meta.env.VITE_FEATURE_ENABLED === 'true'
    console.info('Activo desde la variable de entorno: ' + isEnabled)

    if (isEnabled) {
      return false
    }

    const peruTimeParts = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(now)

    const currentHour = parseInt(
      peruTimeParts.find((part) => part.type === 'hour')?.value || '0',
      10,
    )
    const currentMinute = parseInt(
      peruTimeParts.find((part) => part.type === 'minute')?.value || '0',
      10,
    )
    const currentDay = now.getUTCDay() // 0: Domingo, 1: Lunes, ..., 6: Sábado

    console.info(`Hora actual: ${currentHour}:${currentMinute}`)

    // Verifica si es martes (cerrado por defecto)
    if (currentDay === 2) {
      console.info('Negocio cerrado por martes')
      return true // Negocio cerrado
    }

    // Horarios de atención
    const schedules: Record<number, [number, number]> = {
      1: [18, 0], // Lunes, Miércoles, Jueves: 6:00 PM - 12:00 AM
      3: [18, 0],
      4: [18, 0],
      5: [18, 1], // Viernes, Sábado, Domingo: 6:00 PM - 1:00 AM
      6: [18, 1],
      0: [18, 1], // Domingo
    }

    const schedule = schedules[currentDay]

    // Si no hay horario definido, el negocio está cerrado
    if (!schedule) {
      console.info('No hay horario definido para hoy.')
      return true
    }

    const [startHour, endHour] = schedule

    // Convertir horas y minutos a minutos totales
    const toMinutes = (hour: number, minute: number) => hour * 60 + minute

    const currentTimeInMinutes = toMinutes(currentHour, currentMinute)
    const startTimeInMinutes = toMinutes(startHour, 0)
    const endTimeInMinutes =
      endHour > startHour
        ? toMinutes(endHour, 0) // Rango normal
        : toMinutes(endHour + 24, 0) // Si el rango cruza la medianoche

    console.info(`Horario de inicio: ${startHour}:00`)
    console.info(`Horario de fin: ${endHour}:00`)

    // Verificar si está fuera del horario de atención
    const isOutsideBusinessHours =
      currentTimeInMinutes < startTimeInMinutes || currentTimeInMinutes >= endTimeInMinutes

    console.info(`¿Fuera del horario?: ${isOutsideBusinessHours}`)

    // El negocio debe estar cerrado si está fuera del horario
    if (isOutsideBusinessHours) {
      console.info('Negocio cerrado por estar fuera del horario')
      return true
    }

    return false // Negocio abierto
  },
}
