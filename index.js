const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwkrobe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/', async (req, res) => {
    res.send('loan application portal server is running')
})

async function run() {
    try {

        const LoanApplication = client.db('LoanApplications').collection('applications')



        app.get('/details/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await LoanApplication.findOne(query)
            res.send(result)
        })

        app.post('/application', async (req, res) => {
            const query = req.body;
            const result = await LoanApplication.insertOne(query)
            res.send(result)
        })


    }
    catch (error) {
        console.log(error);
    }
}




run().catch(console.log)

app.listen(port, () => console.log(`loan application portal is running on ${port}`))