const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const faunadb = require('faunadb')
const q = faunadb.query

// Instantiate a client
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY
})

exports.handler = async (_event, context) => {
  const { user } = context.clientContext

  const result = await client.query(
    q.Get(
      q.Match(q.Index('getUserByNetlifyID'), user.sub)
    )
  )

  const { stripeID } = result.data

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL
  })

  return {
    statusCode: 200,
    body: JSON.stringify(link.url)
  }
}
