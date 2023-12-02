import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';
// dotenv.config(); // When we are implementing this way show the error because of the hoisting

// const url1 = 'mongodb://localhost:27017';
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = process.env.URL_DB; // when we are want remove the hoisting problem then direclty access the url

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.URL_DB)
    .then((clientInstance) => {
      client = clientInstance;
      console.log('Mongodb is connected');
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDB = () => {
  return client.db();
};
