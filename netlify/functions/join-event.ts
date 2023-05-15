import type { HandlerEvent } from '@netlify/functions'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event: HandlerEvent) => {
  const user = JSON.parse(event.body!)
  const price = event.queryStringParameters!['price']
  const roles = user.app_metadata.roles as string[]
  const stripeID = roles[roles.findIndex(role => role.slice(0,7) == 'stripe:')].slice(7)

  const session = await stripe.checkout.sessions.create({
    customer: stripeID,
    client_reference_id: user.id,
    mode: 'payment',
    line_items: [
      {
        price: price,
        quantity: 1
      }
    ],
    billing_address_collection: 'required',
    automatic_tax: { enabled: true },
    customer_update: { address: 'auto' },
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/events`
  })

  return {
    statusCode: 200,
    body: JSON.stringify(session)
  }
}
