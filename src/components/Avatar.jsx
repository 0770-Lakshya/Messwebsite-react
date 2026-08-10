const GRADIENTS = [
  'linear-gradient(135deg, #45347d, #8e7db4)',
  'linear-gradient(135deg, #d97706, #fbbf24)',
  'linear-gradient(135deg, #10b981, #6ee7b7)',
  'linear-gradient(135deg, #2541b2, #60a5fa)',
]

export default function Avatar({ photo, name, size = 'w-24 h-24', textSize = 'text-2xl', index = 0 }) {
  const initials = (name || '?')
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (photo) {
    return (
      <div
        className={`relative ${size} shrink-0 overflow-hidden rounded-full border-4 object-cover`}
        style={{ borderColor: 'var(--primary)' }}
      >
        <img
          src={photo}
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
      className={`${size} flex shrink-0 items-center justify-center rounded-full border-4 font-bold text-white ${textSize}`}
      style={{ borderColor: 'var(--primary)', background: GRADIENTS[index % GRADIENTS.length] }}
    >
      {initials}
    </div>
  )
}