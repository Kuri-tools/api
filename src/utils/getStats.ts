import { Stats } from 'types'
import { Request, Response } from 'express'
import { getStats } from './getStats'

let stats: Stats = await getStats()
let expiration = new Date().getTime() + 1000 * 60 * 60

export default async function handler () {
  const date = new Date().getTime()

  if (date > expiration) {
    stats = await getStats()
  }

  return (_: Request, response: Response) => {
    response.status(200).json(stats)
  }
}
