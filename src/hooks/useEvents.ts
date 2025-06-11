import Endpoints from "../config/endpoints"
import type { Event } from "../types/event"

// handle events data fetching and management
function useEvents() {
  const [events, setEvents] = useState<Event[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchEvents = async () => {
    setLoading(true)

    try {
      const response = await fetch(Endpoints.events)
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模擬延遲
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Fetch events error:", error)
    } finally {
      setLoading(false)
    }
  }

  return { events, loading, fetchEvents }
}

export default useEvents
