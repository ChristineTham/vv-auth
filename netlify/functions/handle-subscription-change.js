const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const fetch = require('node-fetch')
const faunadb = require('faunadb')
const q = faunadb.query

// Instantiate a client
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY
})

exports.handler = async ({ body, headers }, context) => {
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // bail if this is not a subscription update event
    if (stripeEvent.type !== 'customer.subscription.updated') return

    const subscription = stripeEvent.data.object

    const result = await client.query(
      q.Get(
        q.Match(q.Index('getUserByStripeID'), subscription.customer)
      )
    )
  
    const { netlifyID } = result.data

    // take the last word of the plan name and use it as the role
    const plan = subscription.items.data[0].plan.nickname
    const role = plan.split(' ').reverse()[0].toLowerCase()

    // send a call to the Netlify Identity admin API to update the user role
    const { identity } = context.clientContext
    await fetch(`${identity.url}/admin/users/${netlifyID}`, {
      method: 'PUT',
      headers: {
        // note that this is a special admin token for the Identity API
        Authorization: `Bearer ${identity.token}`
      },
      body: JSON.stringify({
        app_metadata: {
          roles: [role]
        }
      })
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    }
  }
}
