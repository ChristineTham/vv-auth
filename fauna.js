// Require the driver
const faunadb = require('faunadb')
const q = faunadb.query

// Acquire the secret and optional endpoint from environment variables
const secret = process.env.FAUNA_SERVER_KEY

// Instantiate a client
const client = new faunadb.Client({
  secret: secret,
})

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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