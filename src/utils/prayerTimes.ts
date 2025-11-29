// Mock prayer times calculation
// In a real application, you would use a service like adhan or fetch from an API

export const getPrayerTimes = async (): Promise<any> => {
  // This is a mock function - in reality you would calculate based on user's location
  // For now, return fixed times for demonstration
  return {
    fajr: '05:30',
    dhuhr: '13:00',
    asr: '16:30',
    maghrib: '18:45',
    isha: '20:15'
  }
}

// Function to calculate time remaining until next prayer
export const getTimeToNextPrayer = (nextPrayerTime: string): string => {
  const now = new Date()
  const [hours, minutes] = nextPrayerTime.split(':').map(Number)
  
  // Calculate the next prayer time
  const nextPrayer = new Date()
  nextPrayer.setHours(hours, minutes, 0, 0)
  
  // If the time has passed today, set to tomorrow
  if (nextPrayer <= now) {
    nextPrayer.setDate(nextPrayer.getDate() + 1)
  }
  
  const diff = nextPrayer.getTime() - now.getTime()
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${hoursLeft}h ${minutesLeft}m`
}

// Function to get current prayer status
export const getCurrentPrayerStatus = (prayerTimes: any): { current: string, next: string, timeRemaining: string } => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
  
  // Convert times to minutes for comparison
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  }
  
  const fajr = timeToMinutes(prayerTimes.fajr)
  const dhuhr = timeToMinutes(prayerTimes.dhuhr)
  const asr = timeToMinutes(prayerTimes.asr)
  const maghrib = timeToMinutes(prayerTimes.maghrib)
  const isha = timeToMinutes(prayerTimes.isha)
  const current = timeToMinutes(currentTime)
  
  // Determine current prayer time
  if (current < dhuhr) {
    if (current < fajr) {
      return { 
        current: 'isha', 
        next: 'fajr', 
        timeRemaining: getTimeToNextPrayer(prayerTimes.fajr) 
      }
    }
    return { 
      current: 'fajr', 
      next: 'dhuhr', 
      timeRemaining: getTimeToNextPrayer(prayerTimes.dhuhr) 
    }
  } else if (current < asr) {
    return { 
      current: 'dhuhr', 
      next: 'asr', 
      timeRemaining: getTimeToNextPrayer(prayerTimes.asr) 
    }
  } else if (current < maghrib) {
    return { 
      current: 'asr', 
      next: 'maghrib', 
      timeRemaining: getTimeToNextPrayer(prayerTimes.maghrib) 
    }
  } else if (current < isha) {
    return { 
      current: 'maghrib', 
      next: 'isha', 
      timeRemaining: getTimeToNextPrayer(prayerTimes.isha) 
    }
  } else {
    return { 
      current: 'isha', 
      next: 'fajr', 
      timeRemaining: getTimeToNextPrayer(prayerTimes.fajr) 
    }
  }
}