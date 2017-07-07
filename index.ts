import { getComponents } from './src/snapshots'
import * as fs from 'fs'

export default async function snapshots(dir: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, async (err, subPaths: Array<string>) => {
      if (err) return reject(err)
      return resolve(await Promise
        .all(subPaths.map(subPath => resolveComponents(`${dir}/${subPath}`))))
    })
  })
}

async function resolveComponents(path: string) {
  if (await isDir(path)) return snapshots(path)
  return getComponents(await getFile(path))
}

function isDir(path: string) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) return reject(err)
      return stat.isDirectory() ? resolve(true) : resolve(false)
    })
  })
}

function getFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) return reject(err)
      return resolve(content)
    })
  })
}
