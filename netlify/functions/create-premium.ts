import type { HandlerEvent } from '@netlify/functions'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const faunadb = require('faunadb')
const q = faunadb.query

// Instantiate a client
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY
})

exports.handler = async (event: HandlerEvent) => {
  const { user } = JSON.parse(event.body!)

  const result = await client.query(
    q.Get(q.Match(q.Index('getUserByNetlifyID'), user.id))
  )
  const { stripeID } = result.data

  await stripe.checkout.sessions.create({
    customer: stripeID,
    client_reference_id: user.id,
    customer_email: user.email,
    customer_creation: 'if_required',
    mode: 'subscription',
    line_items: [
      {
        price: 'vvpremium'
      }
    ],
    success_url: `${process.env.URL}/success.html`,
    cancel_url: `${process.env.URL}/cancel.html`,
    automatic_tax: { enabled: true }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['premium', 'stripe:' + stripeID]
      }
    })
  }
}
