const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='customer'
const client= new MongoClient(url);
const express = require('express');
const app = express();
const path = require("path")
app.use(express.json());
const cors = require('cors');
const multer = require("multer")
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const cus= require('./schema')
const mongoose = require('mongoose');
async function mongo(){

await mongoose.connect(url,{
  userNewUrlPaser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
  })
  .catch((e) => {
    console.log('not connected',e);
  })

}
//connect to db
async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('customers');  
}
//api for get number of people in cities
app.get("/cities",async (req,resp)=>{
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header('X-Content-Type-Options','nosniff')
   
   let collectionName=await dbConnect();
    
   let response= await collectionName.aggregate([{

    $group: {"_id": "$city", "count":{"$sum": 1}}

    
   }
 ]).toArray()
  resp.send(response)
})
//for search
  app.post("/search/:key",async (req,resp)=>{
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header('X-Content-Type-Options','nosniff')

   let collectionName=await dbConnect();
    
   let response= await collectionName.aggregate([{


     $match:{ "$or" :[
          {first_name:{$regex:req.params.key}},
          {last_name   :{$regex:req.params.key}},
          {city:{$regex:req.params.key}},
       ]}
      },
     {
      $facet: {
        paginatedResults: [ {$skip: (req.body.pageno * req.body.limit)-1},{$limit: req.body.limit}],
        totalCount: [{$count: 'count'}]
      }
    },
    {
      $addFields: {
        total: {
          $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0]}, 0]
        }
      }
    },
    {
      $project: {
        paginatedResults: 1,
        total: 1
      }
    },

]).toArray()
  resp.send(response) 
})
//getting details of customers
app.get("/:id",async (req,resp)=>{
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "X-Requested-With");
  resp.header('X-Content-Type-Options','nosniff')
  
 let collectionName=await dbConnect();
  
 let response= await collectionName.aggregate([{  
  $match:{ id:{$regex:req.params.id}}}
]).toArray()
resp.send(response) 
})
//list of all customers
app.get("/",async (req,resp)=>{
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "X-Requested-With");
  resp.header('X-Content-Type-Options','nosniff')
  
 let collectionName=await dbConnect();
  
 let response= await collectionName.find().toArray()
resp.send(response) 
})
//edit details of customers
app.patch("/edit/:id",async (req,resp)=>{
 resp.header("Access-Control-Allow-Origin", "*");
 resp.header("Access-Control-Allow-Headers", "X-Requested-With");
 resp.header('X-Content-Type-Options','nosniff')
 try{
 let collectionName=await dbConnect();
 let response= await collectionName.updateMany({id:req.params.id},{$set:{first_name:req.body.first_name,
  last_name:req.body.last_name,city:req.body.city,comapny:req.body.comapny}})
 
resp.send(response) 
 }catch(err){
  resp.send(err)
 }
})
app.post("/upload", async (req,resp)=>{
upload(req,resp,function(err) {
  
  if(err) {

      
      // 1MB or uploading different file type)
      resp.send(err)
  }
  else {

      // SUCCESS, image successfully uploaded
      resp.send("Success, Image uploaded!")
  }
})
})
app.set("public",path.join(__dirname,"views"))
app.set("view engine","ejs")
    
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       
const maxSize = 1 * 9000 * 90000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic"); 

app.listen(5002)
module.exports= dbConnect;