import { expect } from 'chai'
import 'mocha'
import { getComponents } from '../src/index'


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
