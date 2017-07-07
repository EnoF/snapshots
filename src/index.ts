export function getComponents(documentation: String) {
  const matches = documentation.match(/```(.*)(.*|\n+|\r+|\r\n+)(.*)(\n+|\r+|\r\n+|.*)(.*)```/g)
  if (!matches) return []
  return matches.map(component => component.replace(/(```|\n|\r')/g, ''))
}
