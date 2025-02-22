import type { WeatherData } from '../types/weather'

interface WeatherDetailsProps {
  weather: WeatherData
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const details = [
    { label: 'Feels Like', value: `${Math.round(weather.feels_like)}°C` },
    { label: 'Humidity', value: `${weather.humidity}%` },
    { label: 'Wind Speed', value: `${weather.wind_speed} m/s` },
    { label: 'Pressure', value: `${weather.pressure} hPa` },
    { label: 'Visibility', value: `${weather.visibility / 1000} km` },
    { label: 'Sunrise', value: new Date(weather.sunrise * 1000).toLocaleTimeString() },
    { label: 'Sunset', value: new Date(weather.sunset * 1000).toLocaleTimeString() },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {detail.label}
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  )
} 