import { COMMITTEE } from '../data/siteData'
import Avatar from '../components/Avatar'

function MemberCard({ member, index, size = 'w-24 h-24', textSize = 'text-2xl' }) {
  return (
    <div className="polaris-card polaris-card-hover p-6 text-center">
      <div className="flex justify-center">
        <Avatar photo={member.photo} name={member.name} size={size} textSize={textSize} index={index} />
      </div>
      <h3 className="font-display mt-4 font-bold">{member.name}</h3>
      <p className="polaris-muted mt-1 text-xs">{member.role}</p>
      {member.email && (
        <p className="mt-2 text-xs" style={{ color: 'var(--primary)' }}>
          <a href={`mailto:${member.email}`}>{member.email}</a>
        </p>
      )}
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

      {/* Hierarchy line */}
      {/* <div className="flex flex-col items-center gap-1 text-sm font-bold text-[#45347D]">
        <span>👑 Mess Coordinator</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="text-xs font-semibold text-[#6b6e76]">Members</span>
      </div> */}

      {/* Coordinator — on top */}
      <div className="mx-auto max-w-sm">
        <MemberCard member={coordinator} index={0} size="w-32 h-32" textSize="text-3xl" />
      </div>

      {/* Members — below */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member, i) => (
          <MemberCard key={member.name} member={member} index={i + 1} />
        ))}
      </div>
    </div>
  )
}