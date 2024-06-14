
const User = require('../models/user');
const router=express.router;

// Controller to get events created by a particular user
router.get('/',async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('eventCreated');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.eventCreated);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});
