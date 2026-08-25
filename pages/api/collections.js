import { getCollections } from '../../lib/products'

export default async function handler(req, res) {
  try {
    return res.status(200).json(await getCollections())
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load collections' })
  }
}