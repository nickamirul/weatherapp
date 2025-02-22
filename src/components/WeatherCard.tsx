import type { WeatherData } from '../types/weather'

interface WeatherCardProps {
  weather: WeatherData
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {weather.city}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold text-gray-800 dark:text-white">
            {Math.round(weather.temp)}°C
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {weather.description}
          </p>
        </div>
      </div>
    </div>
  )
} 