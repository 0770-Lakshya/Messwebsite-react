import { COMMITTEE, MESS_INCHARGE } from '../data/siteData'
import Avatar from '../components/Avatar'

function MemberCard({ member, index, size = 'w-28 h-28', textSize = 'text-3xl' }) {
  return (
    <div className="polaris-card polaris-card-hover p-6 text-center">
      <div className="flex justify-center">
        <Avatar photo={member.photo} name={member.name} size={size} textSize={textSize} index={index} />
      </div>
      <h3 className="font-display mt-4 font-bold">{member.name}</h3>
      <p className="polaris-muted mt-1 text-xs">{member.role}</p>
      {member.email && (
        <p className="mt-2 text-xs" style={{ color: 'var(--primary)' }}>
          <b>
            <a href={`mailto:${member.email}`} style={{ fontSize: '1.7rem' }}>
              ✉
            </a>
          </b>
        </p>
      )}
    </div>
  )
}

function TierLabel({ emoji, label }) {
  return (
    <div className="flex flex-col items-center gap-1 text-sm font-bold text-[#45347D]">
      <span>
        {emoji} {label}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}

export default function Committee() {
  const [coordinator, ...members] = COMMITTEE

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">Student Mess Committee</h2>
        <p className="polaris-muted mt-1 text-sm">
          The student team managing menus, feedback and daily mess operations.
        </p>
      </div>

      

      <TierLabel emoji="🎓" label="Coordinator" />
      {/* Coordinator — on top, biggest */}
      <div className="mx-auto max-w-sm">
        <MemberCard member={coordinator} index={0} size="w-40 h-40" textSize="text-4xl" />
      </div>

      <TierLabel emoji="🎓" label="Mess In-Charge" />

      {/* Mess In-Charge — two cards in one row */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {MESS_INCHARGE.map((member, i) => (
          <MemberCard key={member.name || member.role} member={member} index={i + 1} size="w-32 h-32" textSize="text-3xl" />
        ))}
      </div>

      <TierLabel emoji="👥" label="Members" />

      {/* Members — below */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((member, i) => (
          <MemberCard key={member.name} member={member} index={i + 2} />
        ))}
      </div>
    </div>
  )
}