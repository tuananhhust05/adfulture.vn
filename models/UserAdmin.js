const mongoose = require("mongoose");
const UserAdminSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         required: true,
      },
      pass: {
         type: String,
         required: true,
      },
      IpAllow: {
         type: [String],
         default: [],
      }
   },
   {
      collection: 'UserAdmin',
      versionKey: false
   }
);

module.exports = mongoose.model("UserAdmin", UserAdminSchema);