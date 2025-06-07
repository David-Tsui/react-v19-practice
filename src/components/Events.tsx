import { NavLink } from "react-router-dom"
import type { Event } from "../types/event"
import type { JSX } from "react"

interface EventsProps {
  events: Event[] | null
  loading?: boolean
  placeholder?: string
  renderLoading?: () => JSX.Element
  // eslint-disable-next-line no-unused-vars
  renderItems?: (events: Event[]) => JSX.Element
  // eslint-disable-next-line no-unused-vars
  renderItem?: (event: Event) => JSX.Element
}

function Events(props: EventsProps) {
  const {
    events,
    loading = false,
    placeholder = "目前沒有活動資料",
    renderLoading,
    renderItems,
    renderItem,
  } = props

  if (loading) {
    return <div>{renderLoading ? renderLoading() : <p>Loading...</p>}</div>
  }

  if (!events || events.length === 0) {
    return <div><p>{placeholder}</p></div>
  }

  if (renderItems) {
    return renderItems(events)
  }

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          {renderItem
            ? renderItem(event)
            : (
              <>
                <NavLink to={`/events/${event.id}`}>{event.title}</NavLink>
                <span> - {event.date}</span>
              </>
            )
          }
        </li>
      ))}
    </ul>
  )
}

export default Events
