const model = require("../repositories/company.js")


const UPDATE = async (req, res) => {
    try {
        const data = await model.update(req.body);
        return res.status(200).json({
            status: 200,
            message: "The company information is updated!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};
 
module.exports = { UPDATE }


