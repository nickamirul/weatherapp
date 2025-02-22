import { useState, useEffect } from 'react'
import type { WeatherData, ForecastDay } from '../types/weather'

const GEOCODING_URL = import.meta.env.VITE_GEOCODING_URL
const WEATHER_URL = import.meta.env.VITE_WEATHER_URL

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // First, get coordinates for the city
        const geoRes = await fetch(
          `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1`
        )
        const geoData = await geoRes.json()

        if (!geoData.results?.length) {
          throw new Error('City not found')
        }

        const { latitude, longitude, name } = geoData.results[0]

        // Then fetch weather data
        const weatherRes = await fetch(
          `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}` +
          '&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code' +
          '&daily=temperature_2m_max,temperature_2m_min,weather_code' +
          '&timezone=auto'
        )
        const weatherData = await weatherRes.json()

        // Transform the data to match our interface
        const current = weatherData.current
        const daily = weatherData.daily

        const transformedWeather: WeatherData = {
          city: name,
          temp: current.temperature_2m,
          feels_like: current.apparent_temperature,
          humidity: current.relative_humidity_2m,
          wind_speed: current.wind_speed_10m,
          pressure: current.pressure_msl,
          visibility: 10000, // Open-Meteo doesn't provide visibility
          description: getWeatherDescription(current.weather_code),
          sunrise: 0, // Open-Meteo doesn't provide these in free tier
          sunset: 0,
        }

        const transformedForecast: ForecastDay[] = daily.time.map((time: string, index: number) => ({
          dt: new Date(time).getTime() / 1000,
          temp: {
            min: daily.temperature_2m_min[index],
            max: daily.temperature_2m_max[index],
          },
          weather: [{
            description: getWeatherDescription(daily.weather_code[index]),
            icon: getWeatherIcon(daily.weather_code[index]),
          }],
        }))

        setWeather(transformedWeather)
        setForecast(transformedForecast)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, forecast, isLoading, error }
}

function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
  }
  return descriptions[code] || 'Unknown'
}

function getWeatherIcon(code: number): string {
  // Map WMO codes to similar OpenWeatherMap icons
  const iconMap: Record<number, string> = {
    0: '01d', // Clear sky
    1: '02d', // Mainly clear
    2: '03d', // Partly cloudy
    3: '04d', // Overcast
    45: '50d', // Foggy
    48: '50d', // Rime fog
    51: '09d', // Light drizzle
    53: '09d', // Moderate drizzle
    55: '09d', // Dense drizzle
    61: '10d', // Slight rain
    63: '10d', // Moderate rain
    65: '10d', // Heavy rain
    71: '13d', // Slight snow
    73: '13d', // Moderate snow
    75: '13d', // Heavy snow
    95: '11d', // Thunderstorm
  }
  return iconMap[code] || '01d'
} 