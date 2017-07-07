export function getComponents(documentation: String) {
  const matches = documentation.match(/^```(.*)```$/g)
  if (!matches) return []
  return matches.map(component => component.replace(/```/g, ''))
}
