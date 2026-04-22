import React from 'react';
import { Table, Button, Space } from 'antd';
import { Employee } from '../../models/employee';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (maNhanVien: string) => void;
  onAdd: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'maNhanVien',
      key: 'maNhanVien',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
      key: 'chucVu',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'phongBan',
      key: 'phongBan',
    },
    {
      title: 'Lương',
      dataIndex: 'luong',
      key: 'luong',
      render: (luong: number) => luong.toLocaleString('en-US'),
      sorter: (a: Employee, b: Employee) => b.luong - a.luong, // Sắp xếp giảm dần
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Employee) => (
        <Space size="middle">
          <Button onClick={() => onEdit(record)}>Sửa</Button>
          <Button onClick={() => onDelete(record.maNhanVien)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={onAdd} style={{ marginBottom: 16 }}>
        Thêm nhân viên
      </Button>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="maNhanVien"
        pagination={false}
      />
    </div>
  );
};

export default EmployeeTable;