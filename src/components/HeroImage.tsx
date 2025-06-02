type HeroImageProps = {
  imageUrl?: string
  altText?: string
  ratio?: string
  width?: string
  loading?: 'lazy' | 'eager'
}

const convertToAspectRatio = (ratio: string): string => {
  // Convert a ratio string like '16/9' to a CSS aspect ratio value
  const separatorToken = ['/', ':', 'x', 'X', '*']
  const separatorRegex = new RegExp(`[${separatorToken.join('')}]`)

  if (!ratio || typeof ratio !== 'string' || !separatorRegex.test(ratio)) {
    throw new Error('Invalid ratio format. Use "width/height" or similar formats like "16/9", "4:3", "1x1", etc.')
  }
  // Split the ratio string by the separator and convert to numbers
  ratio = ratio.trim().replace(/\s+/g, '') // Remove any whitespace

  // replace common separators with a single '/'
  ratio = ratio.replace(separatorRegex, '/')
  const [width, height] = ratio.split('/').map(Number)

  if (isNaN(width) || isNaN(height) || height === 0) {
    throw new Error('Invalid ratio values. Ensure both width and height are numbers and height is not zero.');
  }

  // Calculate aspect ratio as a string
  const aspectRatio = (width / height).toFixed(2);
  return `${aspectRatio} / 1`;
}

const HeroImage = (props: HeroImageProps = {}) => {
  const imageUrl = props.imageUrl || 'https://cdn.prod.website-files.com/65393b768d06ee4c16d24a0b/6577af440c9d6b141fc8c6c5_how-to-market-online-courses-p-800.jpg'
  const altText = props.altText || 'Hero Image'
  const ratio = props.ratio ? convertToAspectRatio(props.ratio) : '16/9'
  const width = props.width || '100%'
  const loading = props.loading || 'lazy'

  return (
    <div>
      <img
        src={imageUrl}
        alt={altText}
        style={{
          width: width,
          aspectRatio: ratio,
          objectFit: 'cover',
          borderRadius: '8px',
        }}
        loading={loading}
        className="hero-image"
      />
    </div>
  )
}

export default HeroImage
