import { getComponents } from './src/snapshots'
import * as fs from 'fs'

export default async function snapshots(dir: string, outputDir: string) {
  const shots = await createSnapshots(dir, outputDir)
  fs.writeFileSync(`${outputDir}/results.snap`, stringifySnapshots(shots), (err) => {
    if (err) console.error(err)
  })
  return shots
}

function createSnapshots(dir: string, outputDir: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, async (err, subPaths: Array<string>) => {
      if (err) return reject(err)
      return resolve(await Promise
        .all(subPaths.map(subPath => resolveComponents(`${dir}/${subPath}`, outputDir))))
    })
  })
}

function stringifySnapshots(shots: any) {
  return '[' + shots.map((shot: any) => {
    if (Array.isArray(shot)) return stringifySnapshots(shot)
    return `"${shot}"`
  }).join(',') + ']'
}

async function resolveComponents(path: string, outputDir: string) {
  if (await isDir(path)) return snapshots(path, outputDir)
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
