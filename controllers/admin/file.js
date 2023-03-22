
const Product = require('../../models/Product.js');
const {checkToken} = require('../../utils/checkToken');
const {CreateError} = require('../.././utils/error');
async function UpoadImgProduct(req,res){
    try{
       if(req.body.IdProduct && req.files){
            let check = await checkToken(req.body.tokenJWT);
            if(check.status){
               await Product.updateOne({_id:req.body.IdProduct},{$set:{img:[`/uploads/${req.files[0].filename}`]}});
               return res.json({
                   data:`/uploads/${req.files[0].filename}`,
               })
            }
       }
       else{
          return res.json(CreateError("Req is not valid"));
       }
    }
    catch(e){
       console.log("Lỗi UpoadImgProduct",e);
       return res.json(CreateError(e));
    }
 }

module.exports = {
    UpoadImgProduct
}