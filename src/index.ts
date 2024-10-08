import { Hono } from 'hono'
import { router as dutchTaxRouter } from './controllers/DutchTaxController'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route('/api/netherlands', dutchTaxRouter)

export default app