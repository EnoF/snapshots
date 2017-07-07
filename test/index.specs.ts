import { expect } from 'chai'
import 'mocha'
import snapshots from '../index'
import * as fs from 'fs'

describe('when snapshotting documentation', () => {
  let result: any = null
  before(async () => {
    return result = await snapshots(`${__dirname}/fixtures`, __dirname)
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

  it('should have saved the snapshots', (done) => {
    fs.readFile(`${__dirname}/results.snap`, 'utf8', (err, content) => {
      if (err) done(err)
      console.log(content)
      expect(JSON.parse(content)).to.deep.equal(result)
      done()
    })
  })
})

function recursiveSearch(term: string, data: Array<any>): Boolean {
  return data.some(content => {
    if (Array.isArray(content)) return recursiveSearch(term, content)
    return content.includes(term)
  })
}
