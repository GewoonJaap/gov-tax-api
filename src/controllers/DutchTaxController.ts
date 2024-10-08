import { Hono, Context } from 'hono'
import { scrapeData } from '../services/scraper/DutchTaxScraper'
import { TaxResponse } from '../models/DutchTaxData'

const router = new Hono()

router.get('/tax', async (c: Context) => {
    const data = await scrapeData()
    const response: TaxResponse = { data }
    return c.json(response)
})

export { router }