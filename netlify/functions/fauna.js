// Require the driver
const faunadb = require('faunadb')
const q = faunadb.query

// Instantiate a client
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY
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

exports.handler = async (_event, context) => {
  const netlifyID = makeid(5)
  const res0 = await client.query(
    q.Create(
      q.Collection('User'),
      { data: {
        netlifyID: netlifyID,
        stripeID: makeid(5)
      } },
    )
  )

  const res = await client.query(
    q.Get(
      q.Match(q.Index('getUserByNetlifyID'), netlifyID)
    )
  )

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}