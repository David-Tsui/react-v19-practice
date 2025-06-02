import HeroImage from './HeroImage'

type HeroProps = {
  title?: string
  subtitle?: string
  description?: string
}

function HeroActions() {
  return (
    <div className="hero-actions">
      <a href="/about" className="btn btn-link">
        <button className="btn btn-primary">Get Started</button>
      </a>
      <a href="/contact" className="btn btn-link">
        <button className="btn btn-secondary">Learn More</button>
      </a>
    </div>
  )
}

function Hero(props: HeroProps = {}) {
  const title = props.title || 'Hero Section Title'
  const subtitle = props.subtitle || 'Hero Section Subtitle'
  const description = props.description || 'Hero section description goes here. This is a brief introduction to the content of the hero section, providing context and inviting users to explore further.'

  return (
    <section>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <HeroImage
        ratio='8*4'
        width='60vw'
      />
      <p>{description}</p>
      <HeroActions />
    </section>
  )
}

export default Hero
