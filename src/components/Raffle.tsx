const prizes: number[] = [10, 50, 100, 200, 500]

function Raffle() {
  const [result, setResult] = useState<number | null>(null)
  const [hasDrawn, setHasDrawn] = useState(false)

  const handleDraw = () => {
    const idx = Math.floor(Math.random() * prizes.length)
    setResult(prizes[idx])
    setHasDrawn(true)
  }

  const raffleContentRef = useRef<HTMLDivElement>(null)
  const raffleImageRef = useRef<HTMLImageElement>(null)
  const raffleResult = `<h3>恭喜您！</h3><p>您贏得了 ${result} 元的折價券！</p>`

  if (raffleContentRef.current && raffleImageRef.current && result !== null) {
    raffleContentRef.current.innerHTML = raffleResult
    raffleImageRef.current.src = `https://placehold.co/300x200?text=$${result} coupon`
    raffleImageRef.current.alt = `${result}元折價券`
    raffleImageRef.current.style.display = "block"
    raffleImageRef.current.style.margin = "10px auto"
  }

  return (
    <section className="raffle">
      <h2>抽籤活動</h2>
      <p>參加我們的抽籤活動，贏取精美折價券！</p>
      <button
        onClick={handleDraw}
        disabled={hasDrawn}
      >
        {hasDrawn ? "已參加" : "參加抽籤"}
      </button>

      <div className="raffle-result" ref={raffleContentRef} />
      <img
        ref={raffleImageRef}
        src="https://placehold.co/300x200?text=Loading..."
        alt="raffle-image"
        className="raffle-image"
        style={{ display: "none" }}
      />
    </section>
  )
}

export default Raffle
