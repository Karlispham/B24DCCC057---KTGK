import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Employee } from '../../models/employee';
import { useEmployee } from '../../hooks/useEmployee';
import EmployeeFilter from '../../components/Employee/EmployeeFilter';
import EmployeeTable from '../../components/Employee/EmployeeTable';
import EmployeeForm from '../../components/Employee/EmployeeForm';
import DeleteConfirmModal from '../../components/Employee/DeleteConfirmModal';

const EmployeePage: React.FC = () => {
  const {
    employees,
    searchTerm,
    setSearchTerm,
    chucVuFilter,
    setChucVuFilter,
    phongBanFilter,
    setPhongBanFilter,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployee();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');

  const handleAdd = () => {
    setEditingEmployee(undefined);
    setShowForm(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (maNhanVien: string) => {
    setDeleteId(maNhanVien);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    try {
      deleteEmployee(deleteId);
      setShowDeleteModal(false);
      message.success('Xóa nhân viên thành công');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Có lỗi xảy ra');
    }
  };

  const handleFormSubmit = (employee: Omit<Employee, 'maNhanVien'>) => {
    if (editingEmployee) {
      updateEmployee({ ...employee, maNhanVien: editingEmployee.maNhanVien });
    } else {
      addEmployee(employee);
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Quản lý nhân viên</h1>
      <EmployeeFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        chucVuFilter={chucVuFilter}
        onChucVuChange={setChucVuFilter}
        phongBanFilter={phongBanFilter}
        onPhongBanChange={setPhongBanFilter}
      />
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      <Modal
        title={editingEmployee ? "Sửa nhân viên" : "Thêm nhân viên"}
        visible={showForm}
        onCancel={handleCancelForm}
        footer={null}
      >
        <EmployeeForm
          onSubmit={handleFormSubmit}
          initialData={editingEmployee}
          onCancel={handleCancelForm}
        />
      </Modal>
      <DeleteConfirmModal
        visible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default EmployeePage;