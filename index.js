const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors')

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user:"freedb_kkkkkkkaka",
    host:"sql.freedb.tech",
    password:"4XNq?e7v@@!gMrc",
    database:"freedb_kayalakka"
})


// const db = mysql.createConnection({
//     user:"root",
//     host:"localhost",
//     password:"Karthi@123",
//     database:"Kayal_akka"
// })

app.post(`/login`,(req,res)=>{
    
    // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

    const {Email,password}= req.body   
    console.log('email',Email)                                                                                                                                                                                                                                                     

    db.query(`SELECT * FROM usermaster ul where  ul.email_address  = '${Email}'  and ul.password_new  = '${password}'`,(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
})

app.post(`/checkemail`,(req,res)=>{

    console.log('req.body',req.body)

    const {email_id} = req.body

    console.log('email',email_id)

    db.query(`select ul.email_address from usermaster ul where ul.email_address ='${email_id}' `,(err,result)=>{
        if(err){
            // res.send(500).send({message:'error',error:err})
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log("result",result)
            res.send({message:"sucess",results:result,errors:err})


        }
    })
})

app.post(`/view_product`,function(req,res){
    
    // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

    // const {Email,password}= req.body                                                                                                                                                                                                                                                        

    db.query(`select * from product `,(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
})

app.post('/productdelete',function(req,res){
    const {id} = req.body

    console.log('id',id)

    db.query(`delete from product p where p.id  = ${id}`,(err,result)=>{
        if(err){
            console.log('err',err)
        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })

    
})

app.post('/updateproduct',function(req,res){
    const {search_product} = req.body

    db.query(`select * from product p where p.product_code=${search_product}`,(err,result)=>{
        if(err){
            console.log('errr',err)
        }else{
            res.send({message:"sucess",results:result,errors:err})

            console.log('result',result)
        }
    })

    console.log('searcchhchchc',search_product)
})

app.post(`/product`,(req,res)=>{

    // const Email=req.body.email;

    const  {formdata,loginuser} = req.body
    console.log('forrrrr',formdata)

    // const product_code_1 = formdata.map(d=>d.product_code)

    const product_code_1 = formdata.map(d=>d.product_code)
    const product = formdata.map(e=>e.product_title)
    const amount = formdata.map(f=>f.amount)
    // const quantity = formdata.map(j.quantity)
    const qty = formdata.map(s=>s.product_qty,product)
    const count = 0
    const product_type = formdata.map(d=>d.product_type)


    console.log("formdata",loginuser)

    const firstname = loginuser.map(d=>d.first_name)
    const email = loginuser.map(d=>d.email_address)
    const mobile = loginuser.map(d=>d.mobilenumber)
    const message = `product saved by${firstname,email}` 

    // const query_data = `insert into product (product_code,product_title,amount,quantity) values(?,?,?,?)`,[product_code_1,product,amount,quantity],(err,result)

    db.query(`insert into product (product_code,product_title,amount,quantity,count_new,product_type) values(?,?,?,?,?,?)`,[product_code_1,product,amount,qty,count,product_type],(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            // console.log("result",result)
        }
    })

    db.query(`insert into auditlog (firstname,email,mobile,message) values(?,?,?,?)`,[firstname,email,mobile,message],(err,results)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log('resiult2nd',results)
        }
    })
   
 
})

// app.post(`/view_product`,(req,res)=>{
    
//     // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

//     // const {Email,password}= req.body                                                                                                                                                                                                                                                        

//     db.query(`select * from product   limit 2`,(err,result)=>{
//         if(err){
//             // console.log("hhhh",err)
        
//             res.status(500).send({message:"error",errors:err})

//         }else{
//             res.send({message:"sucess",results:result,errors:err})
//             // console.log("result",result)
//         }
//     })
// })

app.post('/signup',(req,res)=>{


    const {formdata} = req.body
    console.log('reqqqqq',formdata[0].Email)
    const first_name = formdata[0].firstname
    const lastname = formdata[0].lastname
    const email = formdata[0].Email
    const password = formdata[0].password
    const usertype = formdata[0].userType
    const mobilenumber = formdata[0].mobilenumber

    
    db.query(`insert into usermaster (first_name,last_name,email_address,password_new,user_typeid,mobilenumber) values(?,?,?,?,?,?)`,[first_name,lastname,email,password,usertype,mobilenumber],(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
    
    // db.query(`insert into usermaster (first_name,last_name,email_address,password_new,user_typeid) values[?,?,?,?,?]`,[formdata[0].firstname,formdata[0].lastname,formdata[0].email_id,formdata[0].password,formdata[0].userType],(err,result)=>{
    //     if(err){
    //         console.log('err',err)
    //     }else{
    //         console.log('result',result)
    //     }
    // })
})


///////search product

app.post('/searchproduct',(req,res)=>{
    console.log('wwwww',req.body)

    const {product_code} = req.body


    db.query(`select * from product p where p.product_code=${product_code}`,(err,result)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log('result',result)
            res.send({message:"sucess",results:result,errors:err})


        }
    })

   
    
})

app.post('/qrsearch',(req,res)=>{
    console.log('wwwww',req.body)

    const {product_code} = req.body
    console.log(product_code)


    db.query(`select * from product p where p.product_code=${product_code}`,(err,result)=>{
        if(err){
            // res.status(500).send({message:"error",errors:err})

        }else{
            console.log('result',result)
            // res.send({message:"sucess",results:result,errors:err})


        }
    })

   
    
})

app.post('/updateproduct_search',(req,res)=>{
    const {formdata,loginuser} = req.body
    console.log('formsss',formdata)

    const total_amount = formdata[0].total
    const quantity = formdata[0].quantity
    const product_code = formdata[0].product_code
    console.log("total_amoun",total_amount)
    const firstname = loginuser.map(d=>d.first_name)
    const email = loginuser.map(d=>d.email_address)
    const mobile = loginuser.map(d=>d.mobilenumber)
    const message = `product updated by${firstname,email}` 


    db.query(`UPDATE  product as p SET p.amount = ${total_amount} , p.quantity  = ${quantity} where p.product_code = ${product_code}`,(err,result)=>{
        if(err){
            console.log('err',err)
        }else{
            // console.log('result',result)
            res.send({message:"sucess",results:result,errors:err})

        }
    })


    db.query(`insert into auditlog (firstname,email,mobile,message) values(?,?,?,?)`,[firstname,email,mobile,message],(err,results)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log('resiult2nd',results)
        }
    })
})

app.get('/billno',(req,res)=>{


    db.query(`select * from userbill order by id desc limit 1`,(err,result)=>{
        if(err){
            console.log('errrrr',err)
        }else{
            res.send({message:"sucess",results:result,errors:err})

        }
    })
})

app.post('/savebill',(req,res)=>{
    const {orginal,loginuser,Customer,mobiles,billno} = req.body

   const  product_code = orginal.map(e=>e.product_code)
   const product_title = orginal.map(r=>r.product_title)
   const amount =  orginal.map(i=>i.count_new)
   const net_qty  = orginal.map(u=>u.net_qty)
   const product_type = orginal.map(j=>j.product_type)

   const firstname = loginuser.map(d=>d.first_name)
    const email = loginuser.map(d=>d.email_address)
    // const mobile = loginuser.map(d=>d.mobilenumber)
    const mobile = '99876543210'
    const message = `Bill Saved by${firstname,email}` 


    console.log('mobile',mobile)

    // var bill_no = ''

    // const dd = 
    // console.log('newbill',dd)

    
   



    const new_billno =  parseInt(billno+1)


  
       
       orginal.map((item)=>{
     db.query (`insert into userbill (product_code,product_title,amount,net_qty,product_type,bill_no,customername,mobilenumber) values('${item.product_code}','${item.product_title}','${item.amount}','${item.net_qty}','${item.product_type}','${new_billno}','${Customer}','${mobile}')`,(err,result)=>{
        if(err){
            console.log('err',err)
        }else{
            console.log('ress',result)
        }
     })

      })

          

    

//    console.log('newewewewww',orginal)

        // if(rr.length>=1){
        //       db.query(rr,(err,result)=>{
        //     if(err){
        //         res.status(500).send({message:'error found',errors:err})
        //         console.log('throwerr',err)
        //     }else{
        //     res.send({message:"sucess",results:result,errors:err})
        //        console.log('result',result)
        //     }
        // })
        // }

      
        // db.query(`insert into auditlog (firstname,email,mobile,message) values(?,?,?,?)`,[firstname,email,mobile,message],(err,results)=>{
        //     if(err){
        //         res.status(500).send({message:"error",errors:err})
    
        //     }else{
        //         console.log('resiult2nd',results)
        //     }
        // })

    
})


db.connect((err)=>{
    err? console.log(err): console.log("connected")
})


app.listen(7001,()=>{
    console.log("server running port 7001")
})