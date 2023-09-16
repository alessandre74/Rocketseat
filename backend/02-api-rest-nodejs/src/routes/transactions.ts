import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', async (request, reply) => {
  //   console.log(`[${request.method}] ${request.url}`)
  // })

  // Lista todas as transações do usuário logado
  app.get('/', { preHandler: [checkSessionIdExists] }, async request => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions').where('session_id', sessionId).select()

    return { transactions }
  })

  // Lista todas as transações pelo id do usuário logado
  app.get('/:id', { preHandler: [checkSessionIdExists] }, async request => {
    const getTransactionParamsSchemma = z.object({
      id: z.string().uuid()
    })

    const { id } = getTransactionParamsSchemma.parse(request.params)

    const { sessionId } = request.cookies

    const transaction = await knex('transactions').where({ session_id: sessionId, id }).select().first()

    return { transaction }
  })

  // Retorna o total do campo amount de todas as transações do usuário logado
  app.get('/summary', { preHandler: [checkSessionIdExists] }, async request => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions').where('session_id', sessionId).sum('amount', { as: 'amount' }).first()

    return { summary }
  })

  // Insere uma nova transação
  app.post('/', async (request, reply) => {
    const createTransactionsBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = createTransactionsBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7days
      })
    }
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId
    })

    return reply.status(201).send()
  })
}
