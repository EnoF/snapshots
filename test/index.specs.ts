import { expect } from 'chai'
import 'mocha'
import snapshots from '../index'

describe('when snapshotting documentation', () => {
  let result: any = null
  before(async () => {
    return result = await snapshots(`${__dirname}/fixtures`)
  })

  it('should have the root component', () => {
    expect(recursiveSearch('<root-component>', result)).to.equal(true)
  })

  it('should have the other component', () => {
    expect(recursiveSearch('<other-component>', result)).to.equal(true)
  })

  it('should have the my component', () => {
    expect(recursiveSearch('<my-component>', result)).to.equal(true)
  })
})

function recursiveSearch(term: string, data: Array<any>): Boolean {
  return data.some(content => {
    if (Array.isArray(content)) return recursiveSearch(term, content)
    return content.includes(term)
  })
}
