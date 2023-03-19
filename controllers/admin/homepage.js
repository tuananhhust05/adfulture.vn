
const ProductHomepage = require('../../models/ProductHomepage.js');
const Product = require('../../models/Product.js');
const {checkToken} = require('../../utils/checkToken');
const {CreateError} = require('../.././utils/error');

async function CreateHomePageElement(req,res){
   try{
        if(req.body.site && req.body.title && req.body.type && req.body.img  && req.body.tokenJWT){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                let newProductHompage = new ProductHomepage({
                    site: req.body.site,
                    title: req.body.title,
                    type: req.body.type,
                    img:[req.body.img]
                });
                newProductHompage.save().catch((e)=>{console.log("Error newProductHompage CreateHomePageElement"); console.log(e)})
                return res.json({
                   data: newProductHompage,
                   error:null
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
      console.log("error CreateHomePageElement");
      return res.json(CreateError(e));
   }
}

async function EditHomePageElement(req,res){
   try{
        if(req.body.site && req.body.title && req.body.type && req.body.img  && req.body.tokenJWT && req.body._id){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                ProductHomepage.updateOne(
                  {_id:req.body._id},
                  {
                     $set:{
                        site: req.body.site,
                        img:[req.body.img],
                        title: req.body.title,
                        type:req.body.type
                     }
                  }
                ).catch((e)=>{console.log("Lỗi update category EditHomePageElement")})
                return res.json({
                   data:"Edit successfully",
                   error:null
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
      console.log("error CreateHomePageElement");
      return res.json(CreateError(e));
   }
}

async function DeleteHomePageElement(req,res){
   try{
        if(req.body.tokenJWT && req.body._id){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                ProductHomepage.deleteOne(
                  {_id:req.body._id},
                ).catch((e)=>{console.log("Lỗi delete category DeleteProduct")})
                return res.json({
                   data:"Delete successfully",
                   error:null
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
      console.log("error CreateHomePageElement");
      return res.json(CreateError(e));
   }
}

async function CreateProduct(req,res){
   try{
        if(req.body.site && req.body.title && req.body.type && req.body.img  && req.body.tokenJWT && req.body.typeAdd){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                let newProduct = new Product({
                    site: req.body.site,
                    title: req.body.title,
                    type: req.body.type,
                    img:[req.body.img],
                    typeAdd:req.body.typeAdd
                });
                newProduct.save().catch((e)=>{console.log("Error newProduct CreateProduct"); console.log(e)})
                return res.json({
                   data: newProduct,
                   error:null
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
      console.log("error CreateHomePageElement");
      return res.json(CreateError(e));
   }
}

async function EditProduct(req,res){
   try{
        if(req.body.site && req.body.title && req.body.type && req.body.img  && req.body.tokenJWT && req.body._id && req.body.typeAdd){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                Product.updateOne(
                  {_id:req.body._id},
                  {
                     $set:{
                        site: req.body.site,
                        img:[req.body.img],
                        title: req.body.title,
                        type:req.body.type,
                        typeAdd:req.body.typeAdd
                     }
                  }
                ).catch((e)=>{console.log("Lỗi update category EditHomePageElement")})
                return res.json({
                   data:"Edit successfully",
                   error:null
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
      console.log("error CreateHomePageElement");
      return res.json(CreateError(e));
   }
}

async function DeleteProduct(req,res){
   try{
        if(req.body.tokenJWT && req.body._id){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                Product.deleteOne(
                  {_id:req.body._id},
                ).catch((e)=>{console.log("Lỗi delete category DeleteProduct")})
                return res.json({
                   data:"Delete successfully",
                   error:null
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
      console.log("error CreateHomePageElement");
      return res.json(CreateError(e));
   }
}

module.exports = {
    CreateHomePageElement,
    EditHomePageElement,
    DeleteHomePageElement,
    CreateProduct,
    EditProduct,
    DeleteProduct
}
