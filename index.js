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


async function addNewEvent(newEventData){
    try {
        const event = new Event(newEventData)
        const saveEvent = await event.save()
        return saveEvent
    } catch (error) {
        console.log(error)
    }
}

app.post("/event", async(req, res) => {
    try {
        const newEvent = await addNewEvent(req.body)
        if(newEvent){
            res.status(201).json({ message: "Event added successfully.", event: newEvent })
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch(error) {
        res.status(500).json({ error: "Failed to add Event." })
    }
})


const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})