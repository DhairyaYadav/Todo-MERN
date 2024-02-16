import  express  from "express";
import mongoose from "mongoose";
import { User } from "./Models/user.model.js";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";
import { Todo } from "./Models/todo.model.js";
import path from 'path';



const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = process.env.PORT

mongoose.connect(`${process.env.MONGO_URI}todoDB`)

mongoose.connection.on('connected', () => {
    console.log("Connected");
  });
  
  mongoose.connection.on('error', (error) => {
    console.log(error);
  });

app.use(express.json())

const requireLogin = (req,res,next) => { // middleware
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({error:"You must be logged in"})
    }

    try {
        const {userId} = jwt.verify(authorization,JWT_SECRET)
        req.user = userId
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"You must be logged in"})
    }
}

app.get("/",(req,res) => {
    app.use(express.static(path.resolve(__dirname,'web-todo','build')))
    res.sendFile(path.resolve(__dirname,'web-todo','build','index.html'))
})

app.post('/signup',async(req,res) => {
    const {email,password} = req.body
    try {
        if(!email || !password){
            res.status(422).json({error:"Please add all fields"})
        }
    
        const user = await User.findOne({email})
        if (user) {
            return res.status(422).json({error:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        await new User({
            email,
            password:hashedPassword
        }).save()
        res.status(200).json({message:"Signup success"})
    } catch (error) {
        console.log(error);
    }
})
app.post('/signin',async(req,res) => {
    const {email,password} = req.body
    try {
        if(!email || !password){
            res.status(422).json({error:"Please add all fields"})
        }
    
        const user = await User.findOne({email})
        // console.log(user);
        if (!user) {
            return res.status(422).json({error:"User doesn't exists"})
        }
        const doMatch = await bcrypt.compare(password,user?.password)
        if (doMatch) {
           const token = jwt.sign({userId: user._id},JWT_SECRET)
           res.status(200).json({token})
        } else {
            return res.status(401).json({error:"email or password is invalid"})
        }
    } catch (error) {
        console.log(error);
    }
})



//todos
app.post("/createtodo",requireLogin,async(req,res) => {
    const data = await new Todo({
        todo: req.body.todo,
        todoBy: req.user
    }).save()
    return res.status(201).json({message:data})
})

app.get("/gettodos",requireLogin,async(req,res) => {
    const data = await Todo.find({
        todoBy:req.user
    })
    return res.status(200).json({message:data})
})

app.delete("/remove/:id",requireLogin,async(req,res)=>{
    try {
        const removedTodo = await Todo.findOneAndDelete({
            _id: req.params.id
        })
        return res.status(200).json({message:removedTodo})
    } catch (error) {
        console.log(error);
    }
})

app.listen(port,() => {
    console.log("app is live on port: ",port);
})