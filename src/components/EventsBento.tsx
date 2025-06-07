import { NavLink } from 'react-router-dom'
import useEvents from '../hooks/useEvents'
import type { Event } from '../types/event'
import { Icon } from '@iconify/react'
import './styles/EventsBento.scss'

function EventsBento() {
  const { events, fetchEvents, loading } = useEvents()

  useEffect(() => {
    fetchEvents()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Events
      events={events}
      loading={loading}
      placeholder="目前沒有活動資料"
      renderItems={(allEvents) => {
        const additionalEvents =  Array.from({ length: 2 }, () => ({ title: 'Upcoming...' })) as Event[]
        const list = [...allEvents, ...additionalEvents]
        const upcomingEvents = list.filter(event => {
          return !event.date || (new Date(event.date) > new Date())
        })

        return (
          <div className="events-bento">
            {upcomingEvents.map((event) => event.id ?
              (
                <NavLink
                  to={`/events/${event.id}`}
                  key={event.id}
                  className="event-item"
                >
                  <figure>
                    <img src={event.imageUrl} alt={event.title} />
                  </figure>
                  <div className="event-content">
                    <p className="title">{event.title}</p>
                    <p><Icon icon="mdi-light:calendar"/>{event.date}</p>
                    <p><Icon icon="mdi-light:map-marker"/>{event.location}</p>
                    <p>{event.description}</p>
                  </div>
                </NavLink>
              ) : (
                <div className="event-item stuff">
                  <div className="event-content">
                    <p className="title">{event.title}</p>
                  </div>
                </div>
              )
            )}
          </div>
      )}}
    />
  )
}

export default EventsBento
