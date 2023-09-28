const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded())

mongoose.connect('mongodb://localhost:27017/myapp');
console.log("DB connected")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema)

//Routes
app.get('/', async (req, res) => {
    console.log("hello")   
    res.send(req.body)
})
 
app.post("/createUser", async (req, res) => {
    try {
        // res.send("Created")
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.send({ message: "Successfully Created" })
        console.log("Successfully Created")
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

// app.get('/emplist', async(req,res)=>{
//    try {
//      console.log("Get Request")
//      const empData = await userSchema.find()
//      res.send({
//         status : true,
//         message : "All employee records",
//         // empData : empData,
//      });
//    } catch (error) {
//     res.send({
//         status : false,
//         message : "Error Occured!",
//         // empData : err,
//      });
//    }
// })

// app.post('/create', async (req, res) => {
//     const { name, email, password } = req.body
//     try {
//         const data = await User.findOne({ email: email })
//         if (!data) {
//             const user = new User({
//                 name,
//                 email,
//                 password
//             })
//             await user.save()
//             console.log({ message: "Successfully Registered" })
//             res.send({ message: "Successfully Registered" })
//         }
//         else {
//             console.log({ message: "User already registerd" })
//             res.send({ message: "User already registerd" })
//         }
//     } catch (error) {
//         console.log(error)
//         console.log({ message: "Error while adding user" });
//     }
// })

// app.patch('/update/:id', async (req, res) => {
//     // console.log(req.id)
//     console.log(req.params.id)
//     console.log(req.body)
//     try {
//         const updateEmployee = await User.findByIdAndUpdate(req.params.id, req.body, {
//             new : true,
//             runValidators: true,
//         });
//         res.send({
//             status:true,
//             message: "Employee record updated successfully",
//             empData: updateEmployee
//         })
//     } catch (error) {
//         res.send({
//             status:false,
//             message: "Error Occured!",
//             // error: err
//         })
//     }
// })
// app.patch('/delete/:id', async (req, res) => {
//  await User.findByIdAndDelete(req.params.id);
//     try {
//         res.status(204).send().json({
//             status : "Success",
//             data:{},
//         });
       
//     } catch (err) {
//         res.status(500).json({
//             status : 'Failed',
//             message: err,
//         })
//     }
// })
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})


