const express= require('express');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const User=require('./model/UserModel');
const connect = require('./config/db');
const cors=require('cors')

const app=express();

app.use(express.json());
app.use(cors())

app.post('/api/v2/signup',async(req,res)=>{
        try {
         
          const { email, username, password } = req.body;
      
          if (email && username && password) {
            const hashPassword = bcrypt.hashSync(password, 12);
            const token = jwt.sign(username || email, process.env.SECRET_KEY);
      
            const newUser = new User({
              name: username,
              email: email,
              password: hashPassword,
            });
      
            await newUser.save();
      
            return res.status(200).json({
              status: "success",
              message: "Signup Successfully",
              data: {
                token: token,
                user: newUser,
              },
            });
          }
        } catch (err) {
          res.status(400).json({
            message: err.message,
          });
        }
      })

connect().then(()=>{
 app.listen(3000,()=>{
        console.log(`Server is running on PORT 3000`)
    })

}
)
