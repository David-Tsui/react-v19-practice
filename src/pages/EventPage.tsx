import { useParams } from "react-router-dom"

interface Event {
  id: number
  title: string
  date: string
  description: string
  location: string
  imageUrl: string
}

const EventPage = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "心與星的距離 - 李芳個人小型畫展",
      date: "2024-01-15",
      description: "這是一個關於心靈與星空的藝術展覽，展出李芳的最新作品。",
      location: "台北市藝術中心",
      imageUrl: "https://example.com/event1.jpg"
    },
    {
      id: 2,
      title: "科技與藝術的交融 - 藝術家論壇",
      date: "2024-02-20",
      description: "邀請多位藝術家和科技專家探討科技如何影響現代藝術。",
      location: "台北市文化大學",
      imageUrl: "https://example.com/event2.jpg"
    },
    {
      id: 3,
      title: "音樂與自然 - 戶外音樂會",
      date: "2024-03-10",
      description: "在美麗的自然環境中享受音樂，放鬆心靈。",
      location: "陽明山國家公園",
      imageUrl: "https://example.com/event3.jpg"
    }
  ]

  const { eventId } = useParams<{ eventId: string }>()
  const event = events.find(e => e.id.toString() === eventId)

  return (
    <>
      {event ? (
        <div className="event-details">
          <h1>{event.title}</h1>
          <img src={event.imageUrl} alt={event.title} />
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>{event.description}</p>
        </div>
      ) : (
        <div className="not-found">
          <h2>Event Not Found</h2>
          <p>Sorry, we couldn't find the event you're looking for.</p>
        </div>
      )}
    </>
  );
};

export default EventPage;
