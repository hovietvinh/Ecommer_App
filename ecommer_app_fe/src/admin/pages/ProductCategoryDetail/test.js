import React from 'react';
import { Button, Card, Descriptions, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const Test = ({id,data}) => {
  

  const sanitizeHTML = (htmlString) => {
    // You can use libraries like DOMPurify to sanitize HTML
    return htmlString; // or DOMPurify.sanitize(htmlString);
  };
  const navigate = useNavigate()
  // Define a color for status
  const getStatusTag = (status) => {
    if (status === 'active') {
      return <Tag color="green">Active</Tag>;
    }
    return <Tag color="red">Inactive</Tag>;
  };
  const handleClick = ()=>{
    // console.log(id);
    navigate(`/admin/products-category/edit/${id}`)
    
  }
  // console.log(data);
  return (

    <Card title={"Danh mục sản phẩm"} >
      <Descriptions bordered column={1} className="mb-4">
        <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {data.description ? (
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.description) }}
            />
          ) : (
            <Tag color="gray">No Description</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Position">{data.position}</Descriptions.Item>
        <Descriptions.Item label="Status">{getStatusTag(data.status)}</Descriptions.Item>
      </Descriptions>

      <Button onClick={handleClick} type='primary'>Chỉnh sửa</Button>
    </Card>
  );
};

export default Test;
