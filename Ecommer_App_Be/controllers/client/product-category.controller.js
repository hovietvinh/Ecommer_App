const ProductCategory = require("../../models/product-category.model");

module.exports.index = async(req,res)=>{
    try {
        let find= {
            deleted:false,
            status:"active"
        }

        const data = await ProductCategory.find(find);
        let newData = []
        for (const item of data) {
            if (item.parent_id) {
                const Parent = await ProductCategory.findOne({ _id: item.parent_id });
                let plainItem = item.toObject();  // Convert to plain JavaScript object
                plainItem["infoParent"] = Parent;
                newData.push(plainItem)
                // console.log(plainItem, 1);
            }
            else{
                let plainItem = item.toObject();  // Convert to plain JavaScript object
              
                newData.push(plainItem)
            }
        }
        const createTree = (arr,parentId = '')=>{
            const tree=[]
            arr.forEach((item)=>{
                if(item.parent_id==parentId){
                    // let newItem = {item};
                    let newItem={
                        value: item.slug,
                        key:item._id,
                        title:item.title
                    }
                   

                    const children =createTree(arr,item.id);
                    if(children.length>0){
                        newItem.children=children
                    
                    }
                    tree.push(newItem)
                }
            })
            return tree
        }

        res.json({
            code:200,
            data:newData,
            tree:createTree(data)
        })

    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}