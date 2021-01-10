# Strategic Financial Node JS Test

This node app was built using Express.JS for API requests and responses, and Mongoose for dealing with data manipulation and storage. Mocha and Chai were also used for testing

## Database

This app uses a MongoDB database which can be specified via the env variable, `MONGO_URI`.
The database has only 1 collection, `Creditors`.
The model for this collection can be found in `src/db/creditors.js`.
This is the code that specifies the model's schema:

```
const CreditorSchema = new Schema({
  creditorName: String,
  firstName: String,
  lastName: String,
  minPaymentPercentage: Number,
  balance: Number,
});
```

## Seed Data

In order to seed data into the database, run the command `npm run seed`

## How It Works

_A MongoDB connection string is required to successfully run the application. Please obtain a connection string from your local instance of MongoDB or a MongoDB Atlas cluster. Then create an env variable called MONGO_URI to store your connection string._

The app can be started by installing necessary dependencies with `npm install`, then running `npm start`.

When the app is started, a connection to the mongo database is initiated, and express will start listening for connections on port 3000.

The available routes are:

- GET '/api/balance'
  - Returns all creditor data, along with totalBalance and avgMinPaymentPercentage
- GET '/api/analysis'
  - Returns all creditors whose balance is over 2000 and minPayPercentage is less than 29.99
- GET '/api/creditor/:creditorName'
  - Returns all Creditors with specified name, if they exist.
- POST '/api/creditor'
  - Creates a new Creditor
- PATCH '/api/creditor/:id'
  - Updates the specified Creditor

## Requirements

Please design and implement a web API using node.js to have following features:

1. Get all creditor data with total balance and average min pay percentage

2. Get creditor data by creditor name

3. Add a new creditor entry

4. Update an existing creditor entry (partial or full update)

5. Implement credit analysis endpoint to return data that meet following criteria:
   - Creditor balance should be over 2000
   - Creditor min pay percentage shouldn’t exceed 29.99%

Bonus Credit: Make it as a lambda function in AWS

## Testing

All test files can be found in `test/`. All tests were built using Mocha and Chai testing libraries. To run the tests, use the command `npm run test`.

Before each test, the collection of creditors is dropped. The test creates all necessary data, makes the particular request to the express server and then confirms the response from the server is correct.

## Challenges

I'd say the most challenging part of building this app for me learning the ins and outs of Mongoose. In my past projects I've worked with MongoDB's native driver and have gotten relatively comfortable with it. However I wanted to use this challenge as a way to get more familiar with the Mongo ODM and so I decided to go with Mongoose instead. And I really kind of wish I had made the decision sooner to be honest! Mongoose is phenomenal, I can definitely see why its so popular and I'll certainly be using it in my personal projects in the future.

Another challenge was working with Chai. Chai is a testing library I decided to use to build the unit tests for the API. It's another library that I had never used before this but after working with it I can absolutely see it's potential. It was a great tool and really helped building out the unit tests!
