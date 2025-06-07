import useEvents from "../hooks/useEvents"

const EventOrder = {
  ASC: 'asc' as const,
  DESC: 'desc' as const
}
type EventOrderType = typeof EventOrder[keyof typeof EventOrder]

const EventsListPage = () => {
  const { events, fetchEvents, loading } = useEvents()
  const [order, setOrder] = useState<EventOrderType>(EventOrder.DESC)

  useEffect(() => {
    fetchEvents()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSortedEvents = () => {
    if (!events) return []
    const sorted = [...events].sort((a, b) => {
      if (order === EventOrder.ASC) {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
    return sorted
  }

  const sortedEvents = getSortedEvents()

  return (
    <>
      <h1>合作活動</h1>
      <p>在這裡，您可以查看我們即將舉辦的各種藝文活動，無論是音樂會、畫展還是其他形式的藝術活動。</p>
      <div>
        <button onClick={fetchEvents} disabled={loading}>
          {loading ? "Loading..." : "重新整理"}
        </button>
      </div>
      <br />
      <div>
        <button
          onClick={() =>
            setOrder(order === EventOrder.DESC ? EventOrder.ASC : EventOrder.DESC)
          }
        >
          {order === EventOrder.DESC ? "舊 -> 新" : "新 -> 舊"}
        </button>
        <Events
          events={sortedEvents}
          loading={loading}
          placeholder="目前沒有活動資料"
        />
      </div>
    </>
  )
}

export default EventsListPage
