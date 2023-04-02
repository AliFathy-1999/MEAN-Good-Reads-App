import {Schema,model} from 'mongoose';
const schema  = new Schema({
    id:String,
    seq:{
        type:Number,
    },
},{
    timestamps:true
})

const Counter = model("counter",schema);

module.exports = Counter;