const { initializeDatabase } = require("./db/db.connect")
const Event = require("./models/event.model")
const express = require("express")
const app = express()
initializeDatabase()
const cors = require("cors")

const corsOptions = {
    origin: "*",
    credentials: true,
    optionScuccessStatus: 200,
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend running on Vercel")
});

async function showAllEvent(){
    try{
        const allEvent = await Event.find()
        return allEvent 
    } catch(error) {
        console.log(error)
    }
}

async function showEventById(eventId){
    try{
        const event = await Event.findById(eventId)
        return event
    } catch(error) {
        console.log(error)
    }
}

app.get("/events/:eventId", async (req, res) => {
    try{
        const event = await showEventById(req.params)
        if(event){
            res.json(event)
        } else {
            res.status(404).json({ error: "Event not found." })
        }
    } catch(error){
        res.status(500).json({ error: "Error in fetching data." })
    }
})

app.get("/events", async(req, res) => {
    try {
        const event = await showAllEvent(req.params.events)
        if(event){
            res.json(event)
        } else {
            res.status(404).json({ error: "Event not found." })
        }
    } catch(error) {
        res.status(500).json({ error: "Error in fetching Events." })
    }
})


async function addNewEvent(newEventData){
    try {
        const event = new Event(newEventData)
        const saveEvent = await event.save()
        return saveEvent
    } catch (error) {
        console.log(error)
    }
}

app.post("/events", async(req, res) => {
    try {
        const newEvent = await addNewEvent(req.body)
        if(newEvent){
            res.status(201).json({ message: "Event added successfully.", event: newEvent })
        } else {
            res.status(404).json({ error: "Event not found." })
        }
    } catch(error) {
        res.status(500).json({ error: "Failed to add Event." })
    }
})

async function updateEvent(eventId, dataToUpdate){
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, { new: true })
        return updatedEvent
    } catch(error) {
        console.log(error)
    }
}

app.post("/events/:eventId", async(req, res) => {
    try {
        const updatedEvent = await updateEvent(req.params.eventId, req.body)
        if(updatedEvent){
            res.status(200).json({ message: "Event updated successfully", updatedEvent: updatedEvent })
        }
    } catch {
        res.status(500).json({ error: "Error in updating event." })
    }
})


const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})