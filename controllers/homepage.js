const {CreateError} = require('.././utils/error');
const ProductHomepage = require('../models/ProductHomepage.js');
const Product = require('.././models/Product.js');

let limitRequest = 100;
let historyReq = [];
const checkTokenLimitReq = (token) => {
  try{
     let date = new Date().getMinutes();
     let index = historyReq.findIndex((e)=> String(e.token) === String(token));
     if(index <0){
        historyReq.push({
          token:token,
          date:date,
          count:1
        });
        return true 
     }
     else{
        if(Number(historyReq[index].date) !== Number(date)){
            historyReq = historyReq.filter((e) => Number(e.date) == Number(date));
            historyReq.push({
                  token:token,
                  date:date,
                  count:1
               });
            return true ; 
        }
        else{
            historyReq[index].count = historyReq[index].count + 1;
            if(Number(historyReq[index].count) > Number(limitRequest)){
               return false;
            }
            else{
               return true;
            }
        }
     };

  }
  catch(e){
     console.log("Error checkTokenLimitReq",e);
     return false;
  }
}

// return all data to render in homepage 
async function GetDataHomePage(req,res){
   try{
      if(checkTokenLimitReq(req.ip)){
         let products = await ProductHomepage.find({});
         let listVilla = await Product.find({type:"villa"}).limit(3);
         let listStreethouse = await Product.find({type:"streethouse"}).limit(3);
         let listSmallhouse4 = await Product.find({type:"small-house4"}).limit(3);
         let listBuildinghome = await Product.find({type:"building-home"}).limit(3);
         let listShop = await Product.find({type:"shop"}).limit(3);
         let listGardenhouse = await Product.find({type:"garden-house"}).limit(3);
         res.json({
            data:{
               all:products,
               villa:listVilla,
               streethouse:listStreethouse,
               smallhouse4:listSmallhouse4,
               buildinghome:listBuildinghome,
               shop:listShop,
               gardenhouse:listGardenhouse
            },
            error:null
         });
      }
      else{
         return res.json(CreateError("Limited req"));
      }
   }
   catch(e){
      console.log("Lỗi GetDataHomePage",e);
      return res.json(CreateError(e));
   }
}

async function GetProductByType(req,res){
   try{
      if(req.params.type){
         if(checkTokenLimitReq(req.ip)){
            let products;
            if(String(req.params.type) === "all"){
               products = await Product.find({}).limit(100);
               return res.json({
                  data:products,
                  error:null
               });
            }
            else{
               products = await Product.find({type:String(req.params.type)}).limit(100);
               return res.json({
                  data:products,
                  error:null
               });
            }
            
         }
         else{
            return res.json(CreateError("Limited req"));
         }
      }
      else{
         return res.json(CreateError("Req is not valid"));
      }
   }
   catch(e){
      console.log("Lỗi GetDataHomePage",e);
      return res.json(CreateError(e));
   }
}

async function GetHistoryReqHomePage(req,res){
   return res.json(historyReq)
}

module.exports = {
    GetDataHomePage,
    GetHistoryReqHomePage,
    GetProductByType
}
