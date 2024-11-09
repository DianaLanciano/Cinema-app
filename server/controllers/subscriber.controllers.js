import Subscriber from "../models/subscriber.model.js";

export const getSubscriber = async (req, res) => {
    
};

export const addSubscriber = async (req, res) => {
    console.log('addSubscriber function');
    
    try {
        const { firstName, lastName, email, Phone, channel} = req.body;
        if (!firstName || !lastName || !email || !Phone || !channel) {
            res.status(400).json({ error: "Can't add subscriber some data is missing..." });
        }
    
        const subscriber = new Subscriber({
            firstName,
            lastName,
            email, 
            Phone,
            channel
        });
    
        const savedSubscriber = await subscriber.save();
        res.status(201).json(savedSubscriber);
    } catch (error) {
        console.log("Error server/controllers/subscriber.controller > addSubscriber", error.message);
        // Send an error response if saving fails
        res.status(400).json({ message: "Failed to add subscriber", error: error.message });
    }

};