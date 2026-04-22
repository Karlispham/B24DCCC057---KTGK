import React from 'react';
import { Input, Select } from 'antd';
import { PHONG_BAN_OPTIONS, CHUC_VU_OPTIONS } from '../../services/employeeService';

interface EmployeeFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  chucVuFilter: string;
  onChucVuChange: (value: string) => void;
  phongBanFilter: string;
  onPhongBanChange: (value: string) => void;
}

const { Option } = Select;

const chucVuOptions = CHUC_VU_OPTIONS;
const phongBanOptions = PHONG_BAN_OPTIONS;

const EmployeeFilter: React.FC<EmployeeFilterProps> = ({
  searchTerm,
  onSearchChange,
  chucVuFilter,
  onChucVuChange,
  phongBanFilter,
  onPhongBanChange,
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        placeholder="Tìm theo mã hoặc họ tên"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        style={{ width: 200, marginRight: 16 }}
      />
      <Select
        placeholder="Lọc theo chức vụ"
        value={chucVuFilter}
        onChange={onChucVuChange}
        style={{ width: 150, marginRight: 16 }}
        allowClear
      >
        {chucVuOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
      </Select>
      <Select
        placeholder="Lọc theo phòng ban"
        value={phongBanFilter}
        onChange={onPhongBanChange}
        style={{ width: 150 }}
        allowClear
      >
        {phongBanOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
      </Select>
    </div>
  );
};

export default EmployeeFilter;