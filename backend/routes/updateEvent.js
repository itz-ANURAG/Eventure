const Event = require('../models/eventCreate');
const router=express.router;

// Controller to update a specific event
 router.put('/',async (req, res) => {
    const { eventId } = req.params;
    const updateData = req.body;

    try {
        const event = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
});