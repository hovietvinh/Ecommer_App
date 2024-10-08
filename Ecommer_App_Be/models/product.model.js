const mongoose = require("mongoose")
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug)
const productSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        price:Number,
        product_category_id:{
            type:String,
            default:""
        },
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        featured:String,
        position: Number,
        createdBy:{
            account:Object,
            createdAt:{
                type:String,
                default: Date.now
            }
        },
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt:Date,
        slug:{
            type:String,
            slug:"title",
            unique:true
        }

    },{
        timestamps:true
    }
)

const Product = mongoose.model("Product",productSchema,"products")

module.exports = Product