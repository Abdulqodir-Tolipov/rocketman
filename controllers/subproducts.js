const { valid } = require("joi");
const model = require("../repositories/subproducts.js")
const validations = require("../validation/subproducts.js")

const GET = async (req, res) => {
    const category = await model.get();
    if (category) {
        res.status(200).json(category);
    }
}
const POST = async (req,res)=>{
    try{
        let {name,info,price,imgLink,status,productId} = req.body
        const validateResult = validations.addSubProduct.validate({name,info,price,imgLink,status,productId})

        if (validateResult.error) {
            return res
                .status(400)
                .send(validateResult.error.details[0].message);
        }
        const data = await model.post(req.body);

        return res.status(200).json({
            status: 200,
            message: "The new subproduct is added!",
            data
        });
    }catch(error){
        console.error(error)
    }
}
const DELETE = async (req,res)=>{
     try{
        let {id}= req.body
        const validateResult = validations.deleteSubProduct.validate({id})
        if (validateResult.error) {
            return res
                .status(400)
                .send(validateResult.error.details[0].message);
        } 
        const data = await model.delet(req.body);

        return res.status(200).json({
            status: 200,
            message: "The subproduct is eliminated!",
            data
        });

     }catch(error){
         console.error(error)
     }
}
const UPDATE = async (req,res)=>{
    try{
        let {id,name,info,price,imgLink,status,productId} = req.body
        const validateResult = validations.updateSubProduct.validate({id,name,info,price,imgLink,status,productId})
        if (validateResult.error) {
            return res
                .status(400)
                .send(validateResult.error.details[0].message);
        } 
        const data = await model.update(req.body);
        return res.status(200).json({
            status: 200,
            message: "The subproduct is updated!",
            data
        });
    }catch(error){
        console.error(error)
    }
}
module.exports = {
    GET,
    POST,
    DELETE,
    UPDATE
}