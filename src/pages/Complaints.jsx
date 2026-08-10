import { QRCodeSVG } from 'qrcode.react'
import { COMPLAINTS } from '../data/siteData'

export default function Complaints() {
  const { url, email, description } = COMPLAINTS

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">🙋 Complaints &amp; Suggestions</h2>
        <p className="polaris-muted mx-auto mt-1 max-w-xl text-sm">{description}</p>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="polaris-card flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_-10px_rgba(69,52,125,.45)]">
            <QRCodeSVG value={url} size={200} level="M" bgColor="#ffffff" fgColor="#45347d" />
          </div>
          <p className="polaris-muted mt-4 text-xs">
            Scan this QR to open the complaint form.
            <br />
            (Display it at the mess entrance to let students file complaints.)
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="polaris-card p-6">
            <h3 className="font-display mb-2 font-bold">✍️ Online Form</h3>
            <p className="polaris-muted text-sm leading-relaxed">
              Prefer typing from your laptop? Use the form directly — no login needed, submissions are anonymous.
            </p>
            <a href={url} target="_blank" rel="noreferrer" className="btn-primary mt-4 inline-block">
              Open Complaint Form →
            </a>
          </div>
          <div className="polaris-card p-6">
            <h3 className="font-display mb-2 font-bold">📧 Direct Email</h3>
            <p className="polaris-muted text-sm leading-relaxed">
              For urgent issues, reach the mess committee directly by email.
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block text-sm font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}