// Require the driver
const faunadb = require('faunadb')
const q = faunadb.query

// Acquire the secret and optional endpoint from environment variables
const secret = process.env.FAUNA_SERVER_KEY

// Instantiate a client
const client = new faunadb.Client({
  secret: secret,
})

adminClient.query(
  q.CreateDatabase({ name: 'User' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error(
  'Error: [%s] %s: %s',
  err.name,
  err.message,
  err.errors()[0].description,
))

// Create a collection called 'myCollection'
client.query(
  q.Create(
    q.Collection('User'),
    { data: {
      netlifyID: makeid(5),
      stripeID: makeid(5)
    } },
  )
)

// Show the result
.then((ret) => console.log(ret))
.catch((err) => console.error(
  'Error: [%s] %s: %s',
  err.name,
  err.message,
  err.errors()[0].description,
))