import type { HandlerEvent } from '@netlify/functions'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event: HandlerEvent) => {
  const user = JSON.parse(event.body!)
  const roles = user.app_metadata.roles as string[]
  const stripeID =
    roles[roles.findIndex((role) => role.slice(0, 7) == 'stripe:')].slice(7)

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL
  })

  return {
    statusCode: 200,
    body: JSON.stringify(link.url)
  }
}
