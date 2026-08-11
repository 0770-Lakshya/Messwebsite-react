const GRADIENTS = [
  'linear-gradient(135deg, #45347d, #8e7db4)',
  'linear-gradient(135deg, #d97706, #fbbf24)',
  'linear-gradient(135deg, #10b981, #6ee7b7)',
  'linear-gradient(135deg, #2541b2, #60a5fa)',
]

// "/images/x.jpg" is served from public/; normalize relative paths to absolute
// so they work from any route (e.g. /menu, /committee).
function normalizeSrc(photo) {
  if (!photo) return null
  if (photo.startsWith('http') || photo.startsWith('/')) return photo
  return '/' + photo
}

export default function Avatar({ photo, name, size = 'w-24 h-24', textSize = 'text-2xl', index = 0 }) {
  const src = normalizeSrc(photo)
  const initials = (name || '?')
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (src) {
    return (
      <div className={`relative ${size} shrink-0 overflow-hidden rounded-full object-cover shadow-[0_8px_20px_-6px_rgba(69,52,125,.35)]`}>
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'flex'
          }}
        />
        <span
          className="hidden h-full w-full items-center justify-center font-bold"
          style={{ display: 'none', color: 'var(--primary)', background: 'rgba(69,52,125,.12)' }}
        >
          {initials}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-[0_8px_20px_-6px_rgba(69,52,125,.35)] ${textSize}`}
      style={{ background: GRADIENTS[index % GRADIENTS.length] }}
    >
      {initials}
    </div>
  )
}