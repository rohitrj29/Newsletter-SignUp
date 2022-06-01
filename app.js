const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.listen(3000,function(){
  console.log("The server is running on port 3000");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var email=req.body.email;
  var data={
    members:[
        email_address :email,

      status:"subscribed",
      merged_fields:{

        FNAME: firstName,
        LNAME: lastName
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/listid";
  const options={
    method:"POST",
    auth:"rohit:app-id here"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  req.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
