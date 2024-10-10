import React,{useState,useEffect} from 'react';
import { Card, Col, Row, Tag, Button,Space } from 'antd';
import { useNavigate ,NavLink} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { deleteProductCategoryAction, getProductCategoryAction } from '../../../redux/actions/ProductCategoryAction';


const sanitizeHTML = (htmlString) => {
    return htmlString; // You can use a sanitizer like DOMPurify if necessary
  };
const DisplayProductCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const stateProductCategory = useSelector(state=>state.ProductCategoryReducer)
    useEffect(()=>{
        const getProductCategory = ()=>{
                dispatch(getProductCategoryAction())
        }
        getProductCategory()
    },[dispatch])
    const handleAddCategoryClick = () => {
        navigate('/admin/products-category/create'); 
    };

    const handleDelete = (id)=>{
        dispatch(deleteProductCategoryAction(id))
            .then(()=>{
                dispatch(getProductCategoryAction())
            })
        // navigate('/admin/products-category'); 

    }
    console.log(stateProductCategory);
    return (
        <div className='mt-4'>
            {stateProductCategory.productsCategory&& stateProductCategory.productsCategory.length>0 && (
                <Card
                title={
                    <Row justify="space-between" align="middle">
                        <Col>
                            <h1 className="text-[16px]">Danh sách</h1>
                        </Col>
                        <Col>
                            <Button 
                                type="primary" 
                                onClick={handleAddCategoryClick}
                                className="text-[16px]"
                            >
                                Thêm Mới Danh Mục
                            </Button>
                        </Col>
                    </Row>
                }
                headStyle={{
                    color: '#2d3748',
                    padding: '16px',
                    borderRadius: '0.375rem 0.375rem 0 0',
                    width: '100%',
                    boxSizing: 'border-box',
                    fontWeight: '300'
                }}
                style={{ marginBottom: '20px' }}
                className="shadow-md"
            >
                <Row gutter={16}>
                    {stateProductCategory.productsCategory.map((category) => (
                    
                        <Col span={8} key={category._id}>
                            <Card
                                hoverable
                                style={{ 
                                    borderRadius: '8px', 
                                    marginBottom: '16px', 
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    minHeight: '200px',  
                                    display: 'flex',      
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between'
                                }}
                                bodyStyle={{ padding: '16px' }}
                            >
                                <Card.Meta
                                    title={<h3>{category.title}</h3>}
                                    description={
                                        <>
                                            <p><strong>Danh mục cha: </strong> {category.infoParent?(category.infoParent.title):('') }</p>
                                            <div
                                                className="prose prose-lg max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHTML(category.description || 'N/A'),
                                                }}
                                            />

                                            <p>
                                                <strong className='mr-1'>Status:</strong> 
                                                <Tag color={category.status === 'active' ? 'green' : 'red'}>
                                                    {category.status}
                                                </Tag>
                                            </p>
                                            <p>
                                                <strong>Position:</strong> {category.position}
                                            </p>

                                        </>
                                    }
                                />
                                <Space style={{ marginTop: '16px' }}>
                                    <NavLink to={`/admin/products-category/edit/${category._id}`} className="bg-yellow-400 p-2 px-3 text-black rounded-md">Sửa</NavLink>
                                    <Button
                                        onClick={() => handleDelete(category._id)}
                                        size="middle"
                                        type="primary"
                                        danger
                                    >
                                        Xóa
                                    </Button>
                                    <NavLink to={`/admin/products-category/detail/${category._id}`} className="bg-gray-400 p-2 px-3 text-white rounded-md">Chi tiết</NavLink>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card> 
            )}
             
        </div>
    );
};

export default DisplayProductCategory;
