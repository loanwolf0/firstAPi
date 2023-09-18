const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const connectionString = 'mongodb+srv://d600249:Anu12345@task-nodeexpress.mwfivbp.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'

const router = require('./routes/subscribers')

app.use(express.json());
app.use('/api',router)



const start = async () => {
    try {
        await connectDB(connectionString);
        app.listen(3000, ()=>{
            console.log("server is runnig")
        })
    } catch (error) {
        console.log(error.message);
    }
}

start();