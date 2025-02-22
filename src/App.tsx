import { useState } from 'react'
import { WeatherCard } from './components/WeatherCard'
import { WeatherDetails } from './components/WeatherDetails'
import { ForecastSection } from './components/ForecastSection'
import { SearchBar } from './components/SearchBar'
import { LoadingSpinner } from './components/LoadingSpinner'
import { useWeather } from './hooks/useWeather'

const App = () => {
  const [city, setCity] = useState('London')
  const { weather, forecast, isLoading, error } = useWeather(city)

  const handleSearch = (searchCity: string) => {
    setCity(searchCity)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center text-red-500">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <SearchBar onSearch={handleSearch} />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {weather && <WeatherCard weather={weather} />}
            {weather && <WeatherDetails weather={weather} />}
            {forecast.length > 0 && <ForecastSection forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  )
}

export default App 
