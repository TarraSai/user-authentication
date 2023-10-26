const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 9232;
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is at get method");
});

//database creating

mongoose
  .connect(
    "mongodb+srv://formdata:formdata@cluster0.1lguwvd.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("not connected");
  });
const userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});
const data = mongoose.model("autho", userschema);
//register router 
app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body.values;

  try {
    const userexiting = await data.findOne({ email });
    if (userexiting) {
      return res.json({ message: "user already exit" });
    } else {
      const userdata = new data({ name, email, password, confirmPassword });
      res.status(201).json({ message: "register succesfully" });
      await userdata.save();
       
    }
  } catch (error) {
   res
     .status(500)
     .json({
       error: "Internal server error",
       message: "Something went wrong on the server",
     });

  }
});

//login router
app.post('/login',async(req,res)=>{
    const{email,password}=req.body.values;
    
     try {
    const userexiting = await data.findOne({ email });
    
    
    if(!userexiting){
        return res.json({message:"user not have account"})
    }
    else{
        if(password === userexiting.password){
           res.json({ message: "login sucessfully", userexiting: userexiting });
           
          

        }else{
          res.json({ message: "password is not matched" });
          
        }
    }
  } catch (error) {
   res
     .status(500)
     .json({
       error: "Internal server error",
       message: "Something went wrong on the server",
     });

  }
    
});


app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
