import type { HandlerEvent } from '@netlify/functions'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const faunadb = require('faunadb')
// const q = faunadb.query

// // Instantiate a client
// const client = new faunadb.Client({
//   secret: process.env.FAUNA_SERVER_KEY
// })

exports.handler = async (event: HandlerEvent) => {
  const { user } = JSON.parse(event.body!)

  // create a new customer in Stripe
  const customer = await stripe.customers.create({
    name: user.user_metadata.full_name,
    email: user.email,
    metadata: { netlifyID: user.id }
  })

  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_DEFAULT_PRICE_PLAN }]
  })

  // // store the Netlify and Stripe IDs in Fauna
  // await client.query(
  //   q.Create(q.Collection('User'), {
  //     data: {
  //       netlifyID: user.id,
  //       stripeID: customer.id
  //     }
  //   })
  // )

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['member', 'stripe:' + customer.id]
      }
    })
  }
}
