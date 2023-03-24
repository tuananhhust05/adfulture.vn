
const ProductHomepage = require('../../models/ProductHomepage.js');
const Product = require('../../models/Product.js');
const HistoryAccess = require('../../models/HistoryAccess.js');
const {checkToken} = require('../../utils/checkToken');
const {CreateError} = require('../.././utils/error');

async function CreateHomePageElement(req,res){
   try{
        if(req.body.site && req.body.title && req.body.type  && req.body.tokenJWT){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                let newProductHompage = new ProductHomepage({
                    site: req.body.site,
                    title: req.body.title,
                    type: req.body.type,
                    img:['']
                });
                let savedProductPage = await newProductHompage.save();
                return res.json({
                   data: savedProductPage,
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
        if(req.body.site && req.body.title && req.body.type   && req.body.tokenJWT && req.body._id){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                ProductHomepage.updateOne(
                  {_id:req.body._id},
                  {
                     $set:{
                        site: req.body.site,
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
        if(req.body.site && req.body.title && req.body.type   && req.body.tokenJWT && req.body.typeAdd){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                let newProduct = new Product({
                    site: req.body.site,
                    title: req.body.title,
                    type: req.body.type,
                    typeAdd:req.body.typeAdd
                });
                let savedProduct = await newProduct.save();
                return res.json({
                   data: savedProduct,
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
        console.log(req.body);
        if(req.body.site && req.body.title && req.body.type  && req.body.tokenJWT && req.body._id ){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                Product.updateOne(
                  {_id:req.body._id},
                  {
                     $set:{
                        site: req.body.site,
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
                console.log('Invalid token')
                return res.json(CreateError("Invalid token"));
             }
        }
        else{
            console.log('Req is not valid')
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

async function GetListProduct(req,res){
   try{
        if(req.body.tokenJWT && req.body.type && req.body.typeAdd){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
                let condition;
                if(String(req.body.type) === "all"){
                  condition = {}
                }
                else{
                     if(String(req.body.typeAdd) == "all"){
                        condition = {type:req.body.type};
                     }
                     else{
                        condition = {type:req.body.type,typeAdd:req.body.typeAdd};
                     }
                }
                let skip =0;
                if(req.body.skip){
                  skip = Number(req.body.skip);
                }
                let listProduct = await Product.find(condition).sort({_id:-1}).skip(skip).limit(20);
                
                return res.json({
                   data:listProduct,
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
      console.log("error GetListProduct");
      return res.json(CreateError(e));
   }
}

async function TakeDataChart(req,res){
   try{
        if(req.body.tokenJWT){
             let check = await checkToken(req.body.tokenJWT);
             if(check.status){
               
               let arrDate =[];
               let arrDay =[];
               let arrMonth = [];
               let arrYear = [];
               
               // chart date 
               for(let i=0; i< 5; i++){
                  let today = new Date();
                  let past = new Date();
                  past.setDate(today.getDate() - i);
                  arrDate.push({
                     day: Number(past.getDate()),
                     month:Number(past.getMonth()) +1,
                     year: Number(past.getFullYear() )
                  });
                  arrDay.push(Number(past.getDate()));
                  arrMonth.push(Number(past.getMonth()) +1);
                  arrYear.push(Number(past.getFullYear()));
               };
               let listHistory = await HistoryAccess.find({
                  day:{$in:arrDay},
                  month:{$in:arrMonth},
                  year:{$in:arrYear}
               });
               let listResultDate = [];
               for(let i = 0; i < arrDate.length; i++) {
                  listResultDate.push({
                     day:arrDate[i].day,
                     month:arrDate[i].month,
                     year:arrDate[i].year,
                     count:listHistory.find((e)=> e.day == arrDate[i].day) ? listHistory.find((e)=> e.day == arrDate[i].day).count : 0,
                  })
               }

               // chart month 
               let arrMonthChartMonth = [];
               let arrYearChartMonth = [];
               let arrTimeChartMonth = [];
               for(let i=0; i< 5; i++){
                  let today = new Date();
                  let past = new Date();
                  past.setMonth(today.getMonth() - i);
                  arrMonthChartMonth.push(Number(past.getMonth()) +1);
                  arrYearChartMonth.push(Number(past.getFullYear()));
                  arrTimeChartMonth.push({
                     month:Number(past.getMonth()) +1,
                     year:Number(past.getFullYear())
                  })
               };
               let listHitoryMonthPre = await HistoryAccess.aggregate(
                  [
                    {
                        $match: { 
                           "month":{$in:arrMonthChartMonth},
                           "year":{$in:arrYearChartMonth}
                        }
                    },
                    {
                      $group :
                        {
                          _id : "$month",
                          countAccess: { $sum: "$count" }
                        }
                     },
                   ]
                 );
               let listHitoryMonth = [];
               for(let i=0; i < arrTimeChartMonth.length; i++){
                  listHitoryMonth.push({
                     month:arrTimeChartMonth[i].month,
                     year:arrTimeChartMonth[i].year,
                     count: listHitoryMonthPre.find((e)=> e._id == arrTimeChartMonth[i].month) ? listHitoryMonthPre.find((e)=> e._id == arrTimeChartMonth[i].month).countAccess : 0
                  })
               }
               res.json({
                  data:{
                     listResultDate,
                     listHitoryMonth
                  }
               });
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



module.exports = {
    CreateHomePageElement,
    EditHomePageElement,
    DeleteHomePageElement,
    CreateProduct,
    EditProduct,
    DeleteProduct,
    GetListProduct,
    TakeDataChart
}
