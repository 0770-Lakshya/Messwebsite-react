import { COMMITTEE } from '../data/siteData'
import Avatar from '../components/Avatar'

export default function Committee() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">Student Mess Committee</h2>
        <p className="polaris-muted mt-1 text-sm">
          The student team managing menus, feedback and daily mess operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMMITTEE.map((member, i) => (
          <div key={member.email} className="polaris-card p-6 text-center">
            <div className="mx-auto">
              <Avatar
                photo={member.photo}
                name={member.name}
                size="w-24 h-24"
                textSize="text-2xl"
                index={i}
              />
            </div>
            <h3 className="font-display mt-4 font-bold">{member.name}</h3>
            <p className="polaris-muted mt-1 text-xs">{member.role}</p>
            <p className="mt-2 text-xs" style={{ color: 'var(--primary)' }}>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}