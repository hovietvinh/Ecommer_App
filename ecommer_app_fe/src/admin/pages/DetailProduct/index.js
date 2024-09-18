import { Button, Descriptions, Empty, Tag,Image } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams,NavLink } from "react-router-dom";
import { getProductDetailAction } from "../../../redux/actions/ProductAction";
import BoxHead from "../../components/BoxHead";


function DetailProduct() {
    const { collapsed } = useOutletContext();
    const dispatch = useDispatch();
    const stateProduct = useSelector(state => state.ProductReducer);
    const { id } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        dispatch(getProductDetailAction(id));
    }, [dispatch, id]);
    useEffect(() => {
        
        if (typeof stateProduct.products === 'object' && stateProduct.products !== null && !Array.isArray(stateProduct.products)) {
            // console.log("vay");
            setItems([
                { key: 'title', label: 'Tiêu đề', children: stateProduct.products.title || 'N/A', span: 3 },
                { key: 'description', label: 'Mô tả', children: <span dangerouslySetInnerHTML={{ __html: stateProduct.products.description || 'N/A' }} />, span: 3 },
                { key: 'price', label: 'Giá', children: `$${stateProduct.products.price || '0'}`, span: 3 },
                { key: 'discount', label: '% Giảm giá', children: `${stateProduct.products.discountPercentage || '0'}%`, span: 3 },
                { key: 'stock', label: 'Số lượng', children: stateProduct.products.stock || 'N/A' , span: 3},
                
                { key: 'position', label: 'Vị trí', children: stateProduct.products.position || 'N/A' , span: 3},
                { key: 'status', label: 'Trạng thái', children: <Tag className="p-1 m-0 " color={stateProduct.products.status === "active" ? "success" : "error"}>
                {stateProduct.products.status === "active" ? "Hoạt động" : "Dừng hoạt động"}
            </Tag> , span: 3},
                { key: 'thumbnail', label: 'Hình ảnh', children:<Image
                width={200}
                src={stateProduct.products.thumbnail || 'https://via.placeholder.com/150'}
            />, span: 3}

            ]);
        }
    }, [stateProduct.products]);

    return (
        <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px] mb-7`}>
            
            {items.length > 0 && (
                <Descriptions
                    title={<BoxHead text={"Chi tiết sản phẩm"} />}
                    bordered
                    layout="horizontal"
                    items={items}
                    className="mt-5 mr-8 mb-7"
                />
            )}

            <NavLink to={`/admin/products/edit/${stateProduct.products._id}`} className="bg-yellow-400 p-2 px-3 text-black rounded-md">Chỉnh sửa</NavLink>
            
        </div>
    );
}

export default DetailProduct;
