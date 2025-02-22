export interface WeatherData {
  city: string
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  pressure: number
  visibility: number
  description: string
  sunrise: number
  sunset: number
}

export interface ForecastDay {
  dt: number
  temp: {
    min: number
    max: number
  }
  weather: [{
    description: string
    icon: string
  }]
} 