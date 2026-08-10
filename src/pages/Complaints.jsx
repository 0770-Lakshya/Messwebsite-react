import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { QRCodeSVG } from 'qrcode.react'
import { COMPLAINTS } from '../data/siteData'

export default function Complaints() {
  const { url, description } = COMPLAINTS
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load profile'))))
        .then((profile) => setUser({ name: profile.name, email: profile.email, picture: profile.picture }))
        .catch((err) => setError(err.message))
    },
    onError: () => setError('Google sign-in was cancelled or failed. Please try again.'),
  })

  const logout = () => {
    setUser(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">🙋 Complaints &amp; Suggestions</h2>
        <p className="polaris-muted mx-auto mt-1 max-w-xl text-sm">{description}</p>
      </div>

      {error && (
        <div className="polaris-card mx-auto max-w-md p-4 text-center" style={{ borderColor: 'rgba(212,24,61,.4)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--destructive)' }}>
            {error}
          </p>
        </div>
      )}

      {!user ? (
        <div className="polaris-card mx-auto max-w-md p-8 text-center">
          <div
            className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full text-3xl"
            style={{ background: 'rgba(69,52,125,.12)' }}
          >
            🔒
          </div>
          <h3 className="font-display text-xl font-bold">Sign in with Google to continue</h3>
          <p className="polaris-muted mt-2 text-sm leading-relaxed">
            The complaint desk is restricted to Institute Google accounts so the mess committee can follow up on every
            submission. Only your name and email are used.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => login()}
              className="inline-flex -translate-y-0 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0f1115] shadow-[0_8px_24px_-8px_rgba(69,52,125,.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(69,52,125,.55)] active:opacity-70"
              style={{ border: '1px solid var(--border)' }}
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <div className="polaris-card p-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-full border-2 object-cover"
                  style={{ borderColor: 'var(--primary)' }}
                />
              )}
              <div className="text-left">
                <p className="font-display text-lg font-bold">{user.name}</p>
                <p className="polaris-muted text-xs">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="ml-4 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200"
                style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
              >
                Log out
              </button>
            </div>
            <h3 className="font-display text-xl font-bold">Scan to file a complaint</h3>
            <p className="polaris-muted mt-1 text-sm">
              Point your phone camera at the QR code at the mess entrance — or scan the one below — to open the
              complaint form. Your Institute account is already verified.
            </p>
            <div className="mt-6 inline-block rounded-2xl bg-white p-5 shadow-[0_10px_28px_-10px_rgba(69,52,125,.45)]">
              <QRCodeSVG value={url} size={200} level="M" bgColor="#ffffff" fgColor="#45347d" />
            </div>
            <p className="polaris-muted mt-4 text-xs">
              Every complaint goes directly to the mess committee for review.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}