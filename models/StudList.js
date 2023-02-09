const mongoose=require('mongoose');
const schema=mongoose.Schema;


const attendence=new schema({
    Name:{
      type:String,
  
    },
    RollNumber:{
        type :String,
        
    },

    entry:{
        type:String,
        
        
    },
    exit:{

        type:String,
        
        
    }

},{timestamps:true})

const table=mongoose.model('table',attendence);
module.exports=table;