import type { Event } from "../types/event"

interface EventDetailProps {
  event: Event
}

function EventDetail({ event }: EventDetailProps) {
  if (!event) {
    return <p>活動資料尚未載入或不存在。</p>;
  }

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} />
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
    </div>
  )
}

export default EventDetail
