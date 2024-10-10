import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getRolesAction, updatePermissionsAction, updateRolesAction } from '../../../redux/actions/RoleAction';

const { Title } = Typography;

const permissionsData = [
  {
    entity: "Danh mục sản phẩm",
    permissions: [
      { name: "Xem", code: "products_category_view" },
      { name: "Tạo", code: "products_category_create" },
      { name: "Chỉnh sửa", code: "products_category_edit" },
      { name: "Xóa", code: "products_category_delete" }
    ]
  },
  {
    entity: "Sản phẩm",
    permissions: [
      { name: "Xem", code: "products_view" },
      { name: "Tạo", code: "products_create" },
      { name: "Chỉnh sửa", code: "products_edit" },
      { name: "Xóa", code: "products_delete" }
    ]
  },
  {
    entity: "Nhóm quyền",
    permissions: [
      { name: "Xem", code: "roles_view" },
      { name: "Tạo", code: "roles_create" },
      { name: "Chỉnh sửa", code: "roles_edit" },
      { name: "Xóa", code: "roles_delete" },
      { name: "Phân quyền", code: "roles_permissions" }
    ]
  },
  {
    entity:"Tài khoản",
    permissions: [
      { name: "Xem", code: "accounts_view" },
      { name: "Tạo", code: "accounts_create" },
      { name: "Chỉnh sửa", code: "accounts_edit" },
      { name: "Xóa", code: "accounts_delete" },
    
    ]
  }
];

const PermissionTable = () => {
  const dispatch = useDispatch();
  const stateRoles = useSelector(state => state.RoleReducer);
  const [permissionsState, setPermissionsState] = useState({});

  useEffect(() => {
    dispatch(getRolesAction());
  }, [dispatch]);

  useEffect(() => {
    const initialPermissionsState = stateRoles.roles.reduce((acc, role) => {
      acc[role._id] = {};
      permissionsData.forEach(item => {
        item.permissions.forEach(permission => {
          acc[role._id][permission.code] = role.permissions.includes(permission.code);
        });
      });
      return acc;
    }, {});
    setPermissionsState(initialPermissionsState);
  }, [stateRoles.roles]);

  const handlePermissionChange = (roleId, permissionCode) => {
    setPermissionsState(prevState => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        [permissionCode]: !prevState[roleId][permissionCode],
      },
    }));
  };

  const handleUpdate = () => {
    const updatedRoles = stateRoles.roles.map(role => ({
      ...role,
      permissions: Object.keys(permissionsState[role._id] || {}).filter(
        code => permissionsState[role._id][code]
      ),
    }));
    dispatch(updatePermissionsAction(updatedRoles))
    .then(()=>{
      dispatch(getRolesAction())
    })
  };

  const columns = [
    {
      title: 'Tính năng',
      dataIndex: 'permissionName',
      key: 'permissionName',
      render: (text, record) => record.isHeader ? <b>{text}</b> : text,
    },
    ...stateRoles.roles.map(role => ({
      title: role.title,
      dataIndex: role.title,
      key: role._id,
      render: (text, record) => {
        if (record.isHeader) return null;

        const permissionCode = record.permissionCode;
        return (
          <Checkbox
            checked={permissionsState[role._id]?.[permissionCode] || false}
            onChange={() => handlePermissionChange(role._id, permissionCode)}
          />
        );
      },
    })),
  ];

  const data = permissionsData.flatMap((item, index) => {
    const headerRow = {
      key: `${index}_header`,
      permissionName: item.entity,
      isHeader: true
    };

    const permissionRows = item.permissions.map(permission => ({
      key: permission.code,
      permissionName: permission.name,
      permissionCode: permission.code
    }));

    return [headerRow, ...permissionRows];
  });

  return (
    <>
        <div className="text-right mr-8">
            <Button type="primary" onClick={handleUpdate}>Cập nhật</Button>
        </div>
        <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="mr-8 mt-5"
      />
      
    </>
  );
};

export default PermissionTable;
