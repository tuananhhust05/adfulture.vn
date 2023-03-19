const {CreateError} = require('.././utils/error');
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

async function TakeDataStreetHouse(req,res){
   try{
      if(req.params.type){
        // np2t np3t  np4t 
        if(checkTokenLimitReq(req.ip)){
            let type = String(req.params.type);
            let listProduct;
            if(type ==="all"){
               listProduct = await Product.find({type:"streethouse"});
            }
            else{
               listProduct = await Product.find({type:"streethouse",typeAdd:type});
            }
            return res.json({
              data:listProduct,
              error:null
            });
        }
        else{
            return res.json(CreateError("Limited req"));
        }
      }
      else{
        return res.json(CreateError("Lack of type"));
      }
   }
   catch(e){
      console.log("Lỗi TakeDataVilla",e);
      return res.json(CreateError(e));
   }
}

module.exports = {
    TakeDataStreetHouse
}
