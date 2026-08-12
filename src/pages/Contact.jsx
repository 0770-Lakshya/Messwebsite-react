import { CONTACT } from '../data/siteData'

const MAP_QUERY = encodeURIComponent('Mess Block, IIT Bhilai, Kutelabhata, Bhilai')
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`
const MAP_LINK_URL = 'https://maps.app.goo.gl/VnPGnJqzifBFkQjk9'

const MAP_PIN_KEYFRAMES = `
  @keyframes around-ring1 { 0% { r: 38; opacity: 0.55; } 100% { r: 72; opacity: 0; } }
  @keyframes around-ring2 { 0% { r: 38; opacity: 0.35; } 100% { r: 90; opacity: 0; } }
  @keyframes around-ring3 { 0% { r: 38; opacity: 0.20; } 100% { r: 108; opacity: 0; } }
  @keyframes around-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .around-pin-group { animation: around-float 3s ease-in-out infinite; transform-origin: 130px 165px; }
`

function MapPin() {
  return (
    <svg viewBox="0 0 260 260" width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{MAP_PIN_KEYFRAMES}</style>
      <circle cx="130" cy="165" r="38" fill="none" stroke="#d97706" strokeWidth="1.5">
        <animate attributeName="r" values="38;72" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.55;0" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="130" cy="165" r="38" fill="none" stroke="#d97706" strokeWidth="1">
        <animate attributeName="r" values="38;90" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="130" cy="165" r="38" fill="none" stroke="#d97706" strokeWidth="0.6">
        <animate attributeName="r" values="38;108" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="130" cy="165" rx="18" ry="5" fill="#0f1115" opacity="0.14">
        <animate attributeName="rx" values="18;13;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="ry" values="5;3.5;5" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.14;0.08;0.14" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <g className="around-pin-group">
        <path
          d="M130 60 C108 60 90 78 90 100 C90 128 130 162 130 162 C130 162 170 128 170 100 C170 78 152 60 130 60 Z"
          fill="#d97706"
          fillOpacity="0.12"
          stroke="#d97706"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="130" cy="100" r="14" fill="#d97706" fillOpacity="0.25" stroke="#d97706" strokeWidth="2" />
        <circle cx="130" cy="100" r="6" fill="#d97706" />
      </g>
    </svg>
  )
}

export default function Contact() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">Contact Us</h2>
        <p className="polaris-muted mt-1 text-sm">Reach the mess committee and caterers.</p>
      </div>

      <div className="mx-auto grid max-w-[1240px] items-stretch gap-8 pt-4 pb-4 lg:grid-cols-5">
        <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#6b6e76]">01 · Map &amp; Navigation</p>
            <h2
              className="mt-2 text-[#0f1115] tracking-tight"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, letterSpacing: '-0.015em', fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.18 }}
            >
              Mess Location 
            </h2>
            <p className="pt-2 text-[15px] leading-relaxed text-[#0f1115]/80">
              The permanent campus of IIT Bhilai is situated at Kutelabhata, Bhilai. Use this interactive map to explore the Mess boundary and surrounding area.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex-1 space-y-4">
              <div className="space-y-1.5 text-[15px] text-[#0f1115]/82">
                <p className="text-[14.5px] font-bold text-[#0f1115]">Address Details</p>
                <p className="leading-relaxed">
                  Indian Institute of Technology Bhilai, Kutelabhata, Khapri, District - Durg, Chhattisgarh, Pin - 491002
                </p>
              </div>
              <a
                href={MAP_LINK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-amber-700 transition-all duration-300 hover:text-[#45347D] hover:underline"
              >
                Open in Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
            <div className="hidden shrink-0 items-center justify-center sm:flex">
              <MapPin />
            </div>
          </div>
        </div>

        <div className="relative min-h-[350px] lg:col-span-3">
          <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-sm">
            <iframe
              src={MAP_EMBED_URL}
              title="IIT Bhilai Permanent Campus Map"
              className="h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
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
                  {' '}
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