import { NavLink } from "react-router-dom"
import WeatherReport from "../components/WeatherReport"

const HomePage = () => {
  return (
    <div>
      <Hero
        title="喜歡音樂或繪圖嗎？"
        subtitle="探索我們的藝文共享空間"
        description="在這裡，您可以與其他藝術愛好者分享您的創作，並欣賞他們的作品。無論是音樂、繪畫還是其他形式的藝術，我們都歡迎您的加入！"
      />

      <section className="events">
        <h2>即將舉辦的活動</h2>
        <p>敬請期待我們即將舉辦的藝文活動，讓我們一起探索藝術的無限可能！</p>
        <ul>
          <li>
            <NavLink to="/events/1">心與星的距離 - 李芳個人小型畫展</NavLink>
          </li>
          <li>
            <NavLink to="/events/2">科技與藝術的交融 - 藝術家論壇</NavLink>
          </li>
          <li>
            <NavLink to="/events/3">音樂與自然 - 戶外音樂會</NavLink>
          </li>
        </ul>
      </section>

      <section className="weather">
        <h2>即時天氣資訊</h2>
        <p>查看當地的天氣情況，讓您的藝術創作不受天氣影響！</p>
        <WeatherReport />
      </section>

      <section className="raffle">
        <Raffle />
      </section>
    </div>
  )
}

export default HomePage
