const express = require('express')
const Subscriber = require('../model/subscriber')
const { get } = require('mongoose')
const router = express.Router()

// Getting All
router.get('/', async (req,res) => {

    try {
       const subscribers = await Subscriber.find()
       res.json(subscribers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

// Getting one
router.get('/:id',getSubscriber,(req,res) => {
   res.json(res.subscriber.name) 
})

// creating one
router.post('/', async (req,res) => {
    const subscriber = new Subscriber({
        name:req.body.name,
        cost:req.body.cost
    })

    try {
        const newSbus = await subscriber.save()
        res.status(201).json(newSbus)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

// Updating one
router.patch('/:id',getSubscriber, async (req,res) => {
    if(req.body.name != null ){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriber != null ){
        res.subscriber.cost = req.body.cost
    }

    try {
        const updatedSubs = await res.subscriber.save()
        res.json(updatedSubs)
    } catch (error) {
        res.status(400).json({message : error.message})
    }

})

// Deleting one
router.delete('/:id',getSubscriber, async(req,res) => {
    try {
        const deleteSubs = await Subscriber.findByIdAndRemove(req.params.id)
        res.json({message : "Subscriber deleted" , deleteSubs})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




// middleware 
async function getSubscriber(req,res,next){

    try {
        const subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:"Cannot find subscriber"})
        }
        res.subscriber = subscriber;
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
    next()
}



module.exports = router