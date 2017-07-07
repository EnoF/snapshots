import { expect } from 'chai'
import 'mocha'
import { getComponents, renderComponents, getDocumentedComponents } from '../src/snapshots'


describe('when retrieving components', () => {
  let result: Array<String> = []
  describe('when having one code block', () => {
    before(() => {
      result = getComponents([
        '```',
        '<my-component></my-component>',
        '```',
      ].join(''))
    })

    it('should retrieve my component', () => {
      expect(result).to.deep.equal(['<my-component></my-component>'])
    })
  })
  describe('when having a code block with new lines', () => {
    before(() => {
      result = getComponents(`\`\`\`
          <my-component></my-component>
        \`\`\``)
    })

    it('should retrieve my component', () => {
      const expectation = '          <my-component></my-component>        '
      expect(result).to.deep.equal([expectation])
    })
  })
})

describe('when rendering components', () => {
  let result: Array<String> = []
  describe('when having one component to render', () => {
    before(() => {
      result = renderComponents(['<my-component></my-component>'], 
        (component: String) => `testing${component}testing`)
    })

    it('should render my component with the provided renderer', () => {
      expect(result).to.deep.equal(['testing<my-component></my-component>testing'])
    })
  })
})

describe('when rendering documentation components', () => {
  let result: Promise<Array<Array<String>>> | null = null
  describe('when having one document', () => {
    before(() => {
      result = getDocumentedComponents(['my-component.md'], (component: String) => {
        return Promise.resolve(`
        This is my awesome component:
        \`\`\`
          <my-component></my-component>
        \`\`\``)
      })
    })

    it('should resolve the component', async function() {
      const documents = await result
      const expectation = '          <my-component></my-component>        '
      expect(documents).to.deep.equal([[expectation]])
    })
  })

  describe('when having multiple documents', () => {
    before(() => {
      result = getDocumentedComponents(['my-component.md', 'other-component.md'], (component: String) => {
        return Promise.resolve(`
        This is my awesome component:
        \`\`\`
          <my-component></my-component>
        \`\`\``)
      })
    })

    it('should resolve the component', async function() {
      const documents = await result
      const expectation = '          <my-component></my-component>        '
      expect(documents).to.deep.equal([[expectation], [expectation]])
    })
  })
})
