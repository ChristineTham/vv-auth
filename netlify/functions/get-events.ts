import type { HandlerEvent } from '@netlify/functions'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event: HandlerEvent) => {
  const products = await stripe.products.list()

  return {
    statusCode: 200,
    body: JSON.stringify(
      products.data.filter((product) => product.metadata.type == 'event')
    )
  }
}
