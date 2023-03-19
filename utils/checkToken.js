const jwt = require("jsonwebtoken");
const {takeTokenPassJwt} = require('./takeTokenPassJwt');

async function checkToken(token){
    try{
        let user = await jwt.verify(token, takeTokenPassJwt() )
        if(new Date(user.timeExpried) > new Date()){
            return {
                userName:user.userName,
                status:true
            }
        }
        else{
            return {
                userName:"",
                status:false
            }
        }

    }
    catch(e){
        console.log(e);
        return {
            userName:"",
            status:false
        }
    }
  };

  module.exports = {
    checkToken
}