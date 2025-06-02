import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Hero
        title="喜歡音樂或繪圖嗎？"
        subtitle="探索我們的藝文共享空間"
        description="在這裡，您可以與其他藝術愛好者分享您的創作，並欣賞他們的作品。無論是音樂、繪畫還是其他形式的藝術，我們都歡迎您的加入！"
      />
      <div className="card">
        <Button count={count} setCount={setCount} />
      </div>
      <Contact />
      <Footer />
    </>
  )
}

export default App
