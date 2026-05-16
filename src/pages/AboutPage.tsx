import { profile } from '@/utils/constants';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16">
      {/* 个人信息 */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-[hsl(var(--secondary))] overflow-hidden flex-shrink-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-2">{profile.name}</h1>
            <p className="text-[hsl(var(--primary))] font-medium mb-3">{profile.title}</p>
            <p className="text-muted-foreground leading-relaxed max-w-xl">{profile.bio}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>{profile.location}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 技能 */}
      <section className="mb-16">
        <h2 className="font-display text-2xl text-foreground mb-6">技能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.skills.map((skill) => (
            <div key={skill.name} className="liquid-glass rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground font-medium">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[hsl(var(--primary))] rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              {skill.category && (
                <span className="inline-block mt-2 text-[0.65rem] text-muted-foreground bg-[hsl(var(--secondary))] px-2 py-0.5 rounded">
                  {skill.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 经历时间线 */}
      <section className="mb-16">
        <h2 className="font-display text-2xl text-foreground mb-6">经历</h2>
        <div className="relative border-l-2 border-[hsl(var(--border))] pl-6 space-y-8">
          {profile.timeline.map((item) => (
            <div key={item.id} className="relative">
              {/* 时间线圆点 */}
              <div
                className={`absolute -left-[calc(1.5rem+5px)] top-1 w-2.5 h-2.5 rounded-full border-2 border-[hsl(var(--border))] ${
                  item.type === 'work' ? 'bg-[hsl(var(--primary))]' : 'bg-green-400'
                }`}
              />
              <span className="text-xs text-muted-foreground bg-[hsl(var(--secondary))] px-2 py-0.5 rounded">
                {item.period}
              </span>
              <h3 className="font-semibold text-foreground mt-1">{item.title}</h3>
              <p className="text-sm text-[hsl(var(--primary))]">{item.organization}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 社交媒体 */}
      <section>
        <h2 className="font-display text-2xl text-foreground mb-6">社交媒体</h2>
        <div className="flex gap-4">
          {profile.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-lg px-5 py-3 text-sm text-foreground hover:scale-105 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
