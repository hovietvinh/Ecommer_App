import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductCategoryAction } from '../../../redux/client/actions/ProductCategoryAction';

const Tree = ({setValue,value}) => {
  const stateProductCategory = useSelector(state => state.ProductCategoryReducerClient);
  const dispatch = useDispatch()
  
//   useEffect(()=>{
//     const fetchApi = ()=>{
//       console.log("call");
//       dispatch(getProductCategoryAction())
        
//     }
//     fetchApi()
// },[dispatch])
  // const [value, setValue] = useState();
  const navigate = useNavigate(); // Hook for navigation


  const onChange = (newValue) => {
    setValue(newValue);
    if (newValue) {
      navigate(`/products/${newValue}`);
    }
  };

  const onPopupScroll = (e) => {
    console.log('onPopupScroll', e);
  };



  return (
    <TreeSelect
      showSearch
      className='w-[200px]'
      value={value}
      placeholder="Danh mục"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={stateProductCategory.tree || []}
      onPopupScroll={onPopupScroll}
    />
  );
};

export default Tree;
