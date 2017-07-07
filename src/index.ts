export function getComponents(documentation: String) {
  const matches = documentation.match(/```(.*)(.*|\n+|\r+|\r\n+)(.*)(\n+|\r+|\r\n+|.*)(.*)```/g)
  if (!matches) return []
  return matches.map(component => component.replace(/(```|\n|\r')/g, ''))
}

export function renderComponents(components: Array<String>, render: Function) {
  return components.map(component => render(component))
}

export async function getDocumentedComponents(fileNames: Array<String>, getDocumentation: Function) {
  const files = await Promise.all(fileNames.map(fileName => getDocumentation(fileName)))
  return files.map((file: String) => getComponents(file))
}
