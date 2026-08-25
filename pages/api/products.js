import { getProducts } from '../../lib/products'

export default async function handler(req, res) {
  try {
    return res.status(200).json(await getProducts())
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load products' })
  }
}
