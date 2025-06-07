import { NavLink, useParams } from "react-router-dom"
import useEvents from "../hooks/useEvents"

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const { events, fetchEvents, loading } = useEvents()
  const event = events?.find(e => e.id.toString() === eventId)

  useEffect(() => {
    fetchEvents()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="event-header">
        <span>
          <NavLink to="/">返回前頁</NavLink>
        </span>
        <span> / </span>
        <span>
          <NavLink to="/events">查看其他活動</NavLink>
        </span>
      </div>
      {
        /* Use "key" prop to ensure component state isolated between events */
        loading ? (
          <div className="loading">
            <p>Loading event details...</p>
          </div>
        ) : event ? (
          <EventDetail event={event} key={event.id} />
        ) : (
          <div className="not-found">
            <h2>Event Not Found</h2>
            <p>Sorry, we couldn't find the event you're looking for.</p>
          </div>
        )
      }
    </>
  )
}

export default EventPage
