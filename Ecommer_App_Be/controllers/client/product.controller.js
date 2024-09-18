const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
//[GET] /api/products
module.exports.index = async(req,res)=>{
    try{
        let find= {
            deleted:false,
            status:"active"
        }
        const products = await Product.find(find).sort({position:"desc"})
    
        
        res.json({
            code:200,
            data:products
        })
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}

// module.exports.detail = async(req,res)=>{
    
//     try{
//         const {slug} = req.params
//         let find={
//             deleted:false,
//             slug:slug,
//             status:"active"
//         }
        
//         const products = await Product.findOne(find)
        
//         if(products){
//             res.json({
//                 code:200,
//                 data:products
//             })
//         }
//         else{
//             res.json({
//                 code:400,
//                 message:"Sản phẩm đã bị xóa hoặc k tồn tại"
//             })
//         }
        
//     }catch(e){
//         res.json({
//             code:400,
//             message:"Error in BE"
//         })
//     }
    
// }



// [GET] /api/products/:slugCategory
module.exports.category = async(req,res)=>{
    
    try{
        const {slugCategory} = req.params
        // console.log(slugCategory);
        let find={
            deleted:false,
            slug:slugCategory,
            status:"active"
        }
        
        const category = await ProductCategory.findOne(find)
        // console.log(category);
        if(category){
            const getSubCategory = async(parentId)=>{
                const subs = await ProductCategory.find({
                    deleted:false,
                    status:"active",
                    parent_id:parentId
                })
                let allSub = [...subs]
                for (const sub of subs){
                    const childs = await getSubCategory(sub._id)
                    allSub=allSub.concat(childs)
                }
                return allSub
            }
            const list = await getSubCategory(category._id)
            const listId = list.map(item=>item._id)
            console.log(list);
            const products = await Product.find({
                deleted:false,
                status:"active",
                product_category_id:{$in:[category._id,...listId]}
            }).sort({position:"desc"})
    
            // console.log(products);
            res.json({
                code:200,
                data:products,
                category:category
            })
        }
        else{
            res.json({
                code:200,
                data:[],
                category:""
            })
        }
        
        
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}