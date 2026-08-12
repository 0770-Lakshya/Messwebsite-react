import { useVegMode } from '../lib/vegModeContext'

export default function VegToggle({ className = '' }) {
  const { vegMode, toggleVegMode } = useVegMode()

  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={vegMode}
        aria-label="Toggle veg mode"
        onClick={toggleVegMode}
        className={[
          'group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-bold uppercase tracking-[.08em] transition-all duration-300',
          vegMode
            ? 'border-[#2f8f3d] bg-gradient-to-r from-[#2f8f3d] to-[#43a34f] text-white shadow-[0_8px_24px_-6px_rgba(47,143,61,0.65),0_0_0_4px_rgba(47,143,61,0.18)] hover:shadow-[0_10px_30px_-6px_rgba(47,143,61,0.8),0_0_0_6px_rgba(47,143,61,0.22)]'
            : 'border-[#45347D] bg-gradient-to-r from-white to-[#f5f2fa] text-[#45347D] shadow-[0_6px_18px_-6px_rgba(69,52,125,0.55),0_0_0_4px_rgba(69,52,125,0.12)] hover:shadow-[0_10px_24px_-6px_rgba(69,52,125,0.7),0_0_0_6px_rgba(69,52,125,0.18)]',
        ].join(' ')}
      >
        <span
          className={[
            'grid h-7 w-12 flex-none grid-cols-2 items-center rounded-full p-0.5 ring-2 ring-white/40 transition-colors duration-200',
            vegMode ? 'bg-white/30' : 'bg-[#45347D]/15',
          ].join(' ')}
        >
          <span
            className={[
              'block h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200',
              vegMode ? 'translate-x-5' : 'translate-x-0',
            ].join(' ')}
          />
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="text-base">{vegMode ? '🥗' : '🍽️'}</span>
          <span>Veg Mode</span>
          <span
            className={[
              'rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[.18em]',
              vegMode ? 'bg-white/25 text-white' : 'bg-[#45347D] text-white',
            ].join(' ')}
          >
            {vegMode ? 'On' : 'Off'}
          </span>
        </span>
      </button>
    </div>
  )
}
