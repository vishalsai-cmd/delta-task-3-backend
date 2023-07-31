const mongoose=require("mongoose");
const UserProfileSchema=new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email2:{type: String,unique:true},
        password:String,
        
    },
    {
        collection:"ProfileInfo"
    }
);
mongoose.model("ProfileInfo",UserProfileSchema);
