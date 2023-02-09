const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const table=require('./models/StudList');

const app=express();


const dbURL="mongodb+srv://MjStar:manasroy@cluster0.rhrfoli.mongodb.net/nodefirst?retryWrites=true&w=majority"
mongoose.connect(dbURL)
        .then((result)=>{app.listen(3000)})
        .catch((err)=>{console.log(err)})


                

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','ejs');

app.get('/',(req,res)=>{
    
    table.find().
    then((result)=>{res.render('index',{student:result})})
    .catch((err)=>{console.log(err)});
});

app.get('/numbers',(req,res)=>{
    table.find().count((err,count)=>{
        if(err) console.log(err);
        else res.render('number',{count})});
    
});

app.get('/attendence',(req,res)=>{
    
    res.render('attendence')
});

app.get('/:id',(req,res)=>{
    const id=mongoose.Types.ObjectId(req.params.id);
    
    table.findById(id)
     .then((result)=>{
        res.render('details',{StudDet:result})
     })
     .catch((err)=>{
        res.status(404).render('404')
     });
})

app.post('/',(req,res)=>{
    console.log(req.body);
    
    const Table=table(req.body);
    Table.save()
            .then((result)=>{res.redirect("/")})
            .catch((error)=>{console.log(error)})

});

app.get('/delete/:id',(req,res)=>{
    const id=mongoose.Types.ObjectId(req.params.id);


    table.findByIdAndDelete(id)
     .then((result)=>{
        res.redirect('/')
        
     })
     .catch((err)=>{
        console.log(err)
     });
})



app.use((req,res)=>{
    res.status(404).render('404')
})