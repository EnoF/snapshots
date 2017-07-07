import { expect } from 'chai'
import 'mocha'
import { getComponents } from '../src/index'


describe('when retrieving components', () => {
  describe('when having one code block', () => {
    let result: Array<String> = []
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
})
