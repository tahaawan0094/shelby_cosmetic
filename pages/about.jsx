import InfoPage from '../components/InfoPage'

export default function About() {
  return <InfoPage
    title="About Shelby Cosmetics"
    eyebrow="Our philosophy"
    intro="Timeless beauty begins with a thoughtful ritual. Shelby Cosmetics creates refined skincare formulas that make everyday care feel considered, effective, and quietly luxurious."
    sections={[
      { heading: 'Skincare with intention', body: ['We bring together proven ingredients, sensorial textures, and a calm approach to beauty. Every formula is designed to hydrate, firm, and brighten without overcomplicating your routine.'] },
      { heading: 'Made for your ritual', body: ['Our products are created to fit naturally into real lives: a few purposeful steps, clear guidance, and formulas you can return to every day. Consistency is where the ritual becomes results.'] },
      { heading: 'Our promise', body: ['We believe luxury should feel personal and transparent. We are committed to thoughtful formulation, responsible choices, and a customer experience that treats your trust as carefully as your skin.'] }
    ]}
  />
}
