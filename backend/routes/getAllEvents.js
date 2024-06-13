const express = require('express');
const router = express.Router();
const Event = require('../Models/eventCreationData');

// GET events with search, sort, and filter
router.get('/', async (req, res) => {
    try {
        const { search, sort, filter, page = 1, limit = 10 } = req.query;

        let query = {};
        if (search) {
            query = {
                ...query,
                $or: [
                    { eventName: { $regex: search, $options: 'i' } },
                    { eventDescription: { $regex: search, $options: 'i' } }
                ]
            };
        }

        if (filter) {
            query.eventPrice = { $lte: Number(filter) };
        }

        const sortOptions = {};
        if (sort) {
            sortOptions[sort] = 1; // Ascending sort
        }

        const events = await Event.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const count = await Event.countDocuments(query);

        res.json({
            events,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

module.exports = router;
