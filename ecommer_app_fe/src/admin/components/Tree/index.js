import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const Tree = ({value,onChange,treeData}) => {
    
 
 
  return (
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Chọn danh mục cha"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
    />
  );
};
export default Tree;