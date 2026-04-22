import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { Employee, TrangThai } from '../../models/employee';
import { PHONG_BAN_OPTIONS, CHUC_VU_OPTIONS } from '../../services/employeeService';
interface EmployeeFormProps {
  onSubmit: (employee: Omit<Employee, 'maNhanVien'>) => void;
  initialData?: Employee;
  onCancel: () => void;
}

const { Option } = Select;

const trangThaiOptions = Object.values(TrangThai);
const chucVuOptions = CHUC_VU_OPTIONS;
const phongBanOptions = PHONG_BAN_OPTIONS;

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        label="Họ tên"
        name="hoTen"
        rules={[
          { required: true, message: 'Họ tên không được để trống' },
          { max: 50, message: 'Họ tên tối đa 50 ký tự' },
          { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: 'Họ tên không chứa ký tự đặc biệt' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Chức vụ"
        name="chucVu"
        rules={[{ required: true, message: 'Chức vụ không được để trống' }]}
      >
        <Select>
          {chucVuOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Phòng ban"
        name="phongBan"
        rules={[{ required: true, message: 'Phòng ban không được để trống' }]}
      >
        <Select>
          {phongBanOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Lương"
        name="luong"
        rules={[
          { required: true, message: 'Lương không được để trống' },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/,/g, '')}
          min={0}
        />
      </Form.Item>
      <Form.Item
        label="Trạng thái"
        name="trangThai"
        rules={[{ required: true, message: 'Trạng thái không được để trống' }]}
      >
        <Select>
          {trangThaiOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Lưu</Button>
        <Button onClick={onCancel} style={{ marginLeft: 8 }}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
