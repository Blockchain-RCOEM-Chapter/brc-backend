import CONTACT from "../schema/contact.js";
export const createNewContactQuery = async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const newContactQuery = new CONTACT({
            name,
            email,
            phone,
            message,
        });
        await newContactQuery.save();
        res.status(201).json(newContactQuery);
    } catch (error) {
        console.log(error);
    }
};


export const getAllContactQueries = async (req, res) => {
    try {
        const allContactQueries = await CONTACT.find({});
        res.status(200).json(allContactQueries);
    } catch (error) {
        console.log(error);
        
    }
};