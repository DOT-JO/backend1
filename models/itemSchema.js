const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
    name_ar: { type: String, required: true, unique: true },
    name_en: { type: String, required: true, unique: true },
    price: { type:Number,required: true },
    image: { type: String },
    // category: {
    //     type: String, required: true,
    //     enum: ["elect", "clothing", "healthy"]
    // },
    isDeleted: { type: Boolean, default: false },
    category:{type: mongoose.Schema.Types.ObjectId, ref:"category"},

variants: [
  {
    size: { type: String, required: true },
    color: {type: String, required: true},
    quantity: {type: Number,default:0, required: true,}
  }
]



},
    {
        timestamps: true
    })




module.exports = mongoose.model("Item", itemSchema)