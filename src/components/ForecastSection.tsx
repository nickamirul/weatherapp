import type { ForecastDay } from '../types/weather'

interface ForecastSectionProps {
  forecast: ForecastDay[]
}

export const ForecastSection = ({ forecast }: ForecastSectionProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {forecast.map((day) => (
          <div
            key={day.dt}
            className="flex flex-col items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="h-12 w-12"
            />
            <p className="font-semibold text-gray-800 dark:text-white">
              {Math.round(day.temp.max)}°/{Math.round(day.temp.min)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 