const mongoose = require('mongoose');

const userSchema= new mongoose.Schema(
{
    id:{
        type:Number,
        trim:true,
        required:true,
        unique:true,
    },
    first_name:{
        type:String,
        required:true,
        trim:true,
    },
    last_name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true
    },
    gender:{
        type:String
    },
    avatar:{
        type:String,
        trim:true
    },
    domain:{
        type:String,
        trim:true
    },
    available:{
        type:Boolean
    },
    teamId:{
        type:Number
    }
},
{
    timestamps:true
}
);

const User= new mongoose.model('User',userSchema);
module.exports=User;