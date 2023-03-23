const fs = require('fs')
const Customer = require('../../models/Customer.js');
const { checkToken } = require('../../utils/checkToken');
const { CreateError } = require('../../utils/error');

async function GetListCustomer(req, res) {
    try {
        if (req.body.tokenJWT) {
            let check = await checkToken(req.body.tokenJWT);
            if (check.status) {
                let skip =0;
                if(req.body.skip){
                    skip = Number(req.body.skip);
                }
                let listCustomerRequest = await Customer.find({}).sort({_id:-1}).skip(skip).limit(100);
                res.json({
                    data:listCustomerRequest
                })
            }
            else {
                return res.json(CreateError("Invalid token"));
            }
        }
        else {
            return res.json(CreateError("Req is not valid"));
        }
    }
    catch (e) {
        console.log(e);
        console.log("error editPrice");
        return res.json(CreateError(e));
    }
}

async function ReadRequestCustomer(req, res) {
    try {
        if (req.body.tokenJWT && req.body.IdRequest) {
            let check = await checkToken(req.body.tokenJWT);
            if (check.status) {
                await Customer.updateOne({_id:req.body.IdRequest},{$set:{read:1}});
                return res.json({
                    data: "Read successfully"
                })
            }
            else {
                return res.json(CreateError("Invalid token"));
            }
        }
        else {
            return res.json(CreateError("Req is not valid"));
        }
    }
    catch (e) {
        console.log(e);
        console.log("error ReadRequestCustomer");
        return res.json(CreateError(e));
    }
}

async function CountUnreaderRequest(req,res){
    try{
         if(req.body.tokenJWT){
              let check = await checkToken(req.body.tokenJWT);
              if(check.status){
                 let count = await Customer.countDocuments({read:{$ne:1}});
                 res.json({
                    data:{
                        count
                    }
                 })
              }
              else {
                 return res.json(CreateError("Invalid token"));
              }
         }
         else{
             return res.json(CreateError("Req is not valid"));
         }
    }
    catch(e){
       console.log(e);
       console.log("error GetListProduct");
       return res.json(CreateError(e));
    }
 }
module.exports = { GetListCustomer, ReadRequestCustomer, CountUnreaderRequest }