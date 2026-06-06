export type Section = 'profile' | 'stats' | 'quests' | 'xp' | 'home' | 'experience' | 'academic' | 'personal' | 'skills';

export type DetailData = {
  title: string
  subtitle?: string
  period?: string
  badge?: string

  desc?: string | string[]
  tags?: string[]
  link?: string
  imgs?: string[]
  date?: string
  wip?: boolean
  accentColor?: string
  profileMode?: boolean
}
