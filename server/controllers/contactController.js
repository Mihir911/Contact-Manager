import Contact from "../models/Contact.js";


export const addContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Contact saved successfully!" });

    } catch (error) {
     res.status(500).json({ message: "Error saving contact", error: error.message });     
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
            res.status(200).json(contacts);

    } catch (error) {
            res.status(500).json({ message: "Failed to fetch contacts", error: error.message });

    }
};