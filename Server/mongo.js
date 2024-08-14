const mongose=require('mongoose');

mongose.connect("mongodb://127.0.0.1:27017/blogsite");

const userschema=new mongose.Schema({
  id:String,
  title:String,
  author:String,
  content:String,
})

module.exports=mongose.model("users",userschema)

