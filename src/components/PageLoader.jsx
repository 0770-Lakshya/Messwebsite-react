export default function PageLoader({
  src = '/images/iitbh_logo.png',
  alt = 'Loading logo',
  title = 'PAKADAR PANALAYA',
  subtitle = 'Loading...',
}) {
  return (
    <div className="page-loader-shell" aria-live="polite" aria-busy="true">
      <div className="page-loader-wrap">
        <div className="page-loader-ring">
          <img src={src} alt={alt} className="page-loader-logo" />
        </div>
      </div>

      <div className="page-loader-text-group">
        <div className="page-loader-title">{title}</div>
        <div className="page-loader-subtitle">{subtitle}</div>
      </div>
    </div>
  )
}
