const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');



app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g5zf6vj.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbConnect = async () => {
    try {
        await client.connect()
        console.log('Database Connected!')
    } catch (error) {
        console.log(error.name, error.message)
    }
}
dbConnect()
const productsCollection = client.db('productDB').collection('products');
app.get('/', (req, res) => {
    res.send('running');
})


app.get('/products',async(req,res)=>{
    const cursor =productsCollection.find();
    const result =await cursor.toArray();
    res.send(result);
})


app.post('/products', async (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    const result = await productsCollection.insertOne(newProduct);
    res.send(result);



})
