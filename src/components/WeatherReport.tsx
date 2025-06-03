import type { WeatherData } from "../types/weather"

const WeatherDataTable = ({ data, loading }: { data: WeatherData[] | null, loading: boolean }) => {
  const RowLoading = () => (
    <tr>
      <td colSpan={7}>Loading...</td>
    </tr>
  )
  const RowNoData = () => (
    <tr>
      <td colSpan={7}>No weather data available</td>
    </tr>
  )

  const RowWithData = (weather: WeatherData) => (
    <tr key={weather.date}>
      <td>{new Date(weather.date).toLocaleDateString()}</td>
      <td>{weather.location}</td>
      <td>{weather.temperature.min}</td>
      <td>{weather.temperature.max}</td>
      <td>{weather.weather}</td>
      <td>{weather.rainProbability}</td>
      <td>{weather.humidity}</td>
    </tr>
  )

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Min Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Weather</th>
            <th>Rain Probability (%)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {
            loading
              ? <RowLoading />
              : data && data.length > 0 ? data.map(RowWithData)
                : <RowNoData />
          }
        </tbody>
      </table>
      <style lang="jsx">{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #444;
        }
      `}</style>
    </>
  )
}

function WeatherReport() {
  const endpoint = 'http://localhost:3000/weather'

  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async () => {
    setLoading(true)
    setWeatherData(null)

    try {
      const response = await fetch(endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setWeatherData(data)
    }
    catch (error) {
      console.error('There has been a problem with your fetch operation:', error)
    } finally {
      setLoading(false)
    }
  }

  // Call the fetchWeatherData function when the component mounts
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <button
        onClick={fetchData}
        disabled={loading}
      >
        { loading ? "Loading..." : "Fetch" }
      </button>

      <WeatherDataTable
        data={weatherData}
        loading={loading}
      />
    </div>
  )
}

export default WeatherReport
