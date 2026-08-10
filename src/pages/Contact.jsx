import { CONTACT } from '../data/siteData'

export default function Contact() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">Contact Us</h2>
        <p className="polaris-muted mt-1 text-sm">Reach the mess committee, caterers, or drop feedback.</p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="polaris-card p-6">
          <h3 className="font-display mb-3 font-bold">📮 Mess Committee</h3>
          <p className="polaris-muted text-sm leading-relaxed">
            {CONTACT.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p>
              📧{' '}
              <a href={`mailto:${CONTACT.email}`} style={{ color: 'var(--primary)' }}>
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>

        <div className="polaris-card p-6">
          <h3 className="font-display mb-3 font-bold">🍳 Caterers</h3>
          <div className="space-y-3 text-sm">
            {CONTACT.caterers.map((c) => (
              <div key={c.name}>
                <p className="font-semibold">{c.name}</p>
                <p className="polaris-muted text-xs">
                  📧{' '}
                  <a href={`mailto:${c.email}`} style={{ color: 'var(--primary)' }}>
                    {c.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}