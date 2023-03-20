const bcrypt = require('bcryptjs');
const {CreateError} = require('../../utils/error');
const jwt = require('jsonwebtoken')
const UserAdmin = require('../.././models/UserAdmin.js');
const {takeTokenPassJwt} = require('../../utils/takeTokenPassJwt');
function autoUpdatePass(){
   try{
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync("adfulture.admin.vn.123.123.05.09.01", salt);
     UserAdmin.updateMany({},{$set:{pass:hash}}).catch((e)=>{
         console.log(e);
     })
   }
   catch(e){
      console.log("Error autoUpdatePass")
   }
}

let limitRequest = 1000;
let historyReq = [];
const checkTokenLimitReq = (token) => {
  try{
     let date = new Date().getDate();
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

async function Login(req,res){
    try{
       if(req.body.password && req.body.userName){
          if(checkTokenLimitReq(req.ip)){
              const userCheck = await UserAdmin.findOne({userName:req.body.userName});
              if(userCheck){
                const isPasswordCorrect = await bcrypt.compare(
                    req.body.password,
                    userCheck.pass
                  );
                if(isPasswordCorrect){
                    let time = new Date();
                    let tokenJWT = jwt.sign(
                        { userName:req.body.userName, timeExpried: time.setHours( time.getHours() +4) },
                        takeTokenPassJwt()
                    );
                    return res.json({
                         data:tokenJWT,
                         error:null 
                    })
                }
                else{
                    return res.json(CreateError("Wrong password"));
                }
              }
              else{
                 return res.json(CreateError("Login failed, cannot findUser"));
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

module.exports = {
    autoUpdatePass,
    Login
}