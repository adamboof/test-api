import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()
app.get('/', (c) => c.text('test API'))
app.use(prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

type Bindings = {
  USERNAME: string
  PASSWORD: string
}

const api = new Hono<{ Bindings: Bindings }>()
api.use('/heartbeat/*', cors())

api.post(
  '/heartbeat',
  async (c) => {
    const post = await c.req.json()
    const ok = true
    console.log(post)  
    return c.json({ ok })
  }
)

app.route('/api', api)

export default app