import {Space,Select,Button, notification} from 'antd';
import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateMultiAction,getProductsAdminAction } from '../../../redux/actions/ProductAction';

function ChangeMulti(props) {
    const dispatch= useDispatch()
    const products = useSelector(state=>state.ProductReducer);
    const {selectedRowKeys,setSelectedRowKeys,handleChangePosition} = props
    const options=[
        {
            value: 'active',
            label: 'Hoạt động',
        },
        {
            value:"inactive",
            label:"Dừng hoạt động"
        },
        {
            value:"delete-all",
            label:"Xóa tất cả"
        },
        {
            value:"change-position",
            label:"Thay đổi vị trí"
        }
    ]
    const [selectedAction,setSelectedAction] = useState(null)
    const handleSelectChange = (value)=>{
        setSelectedAction(value)
        
    }
    const handleChangeMulti = ()=>{
        if(selectedRowKeys.length>0 && selectedAction!=null){
            
            if(selectedAction=="change-position"){
                handleChangePosition()
            }
            else{

               
                dispatch(updateMultiAction(selectedAction,selectedRowKeys))
                    .then(() => {
                        dispatch(getProductsAdminAction()); 
                        setSelectedAction(null);
                        setSelectedRowKeys([]);
                    })
                    .catch(error => {
                        notification.error({
                            message: "Thao tác không thành công",
                            description: error.message
                        });
                    });
                setSelectedAction(null)
                setSelectedRowKeys([])
            }
        }
        else{
            if(selectedRowKeys.length==0){
                notification.error({
                    message:"Thao tác không thành công" ,
                    description: "Vui lòng chọn sản phẩm muốn thay đổi"
                })
            }
            else{
                notification.error({
                    message:"Thao tác không thành công" ,
                    description: "Vui lòng chọn hành động"
                })
            }
        }
        
    }
    return (
        <>
            <Space>
                <Select 
                    showSearch	
                    placeholder="Chọn hành động"
                    optionFilterProp="children"
                    value={selectedAction}
                    options={options}
                    className="text-black"
                    onChange={handleSelectChange}
                
                />
                <Button onClick={handleChangeMulti} type="primary">Áp dụng</Button>
            </Space>
        </>
    );
}

export default ChangeMulti;