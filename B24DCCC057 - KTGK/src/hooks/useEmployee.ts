import { useState, useEffect } from 'react';
import { Employee, TrangThai } from '../models/employee';
import { getEmployees, addEmployee as addEmp, updateEmployee as updateEmp, deleteEmployee as deleteEmp } from '../services/employeeService';
import { generateEmployeeId } from '../utils/generateEmployeeId';

export const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chucVuFilter, setChucVuFilter] = useState('');
  const [phongBanFilter, setPhongBanFilter] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.maNhanVien.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (chucVuFilter) {
      filtered = filtered.filter(e => e.chucVu === chucVuFilter);
    }

    if (phongBanFilter) {
      filtered = filtered.filter(e => e.phongBan === phongBanFilter);
    }

    // Sort by luong descending
    filtered = filtered.sort((a, b) => b.luong - a.luong);

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, chucVuFilter, phongBanFilter]);

  const loadEmployees = () => {
    const data = getEmployees();
    setEmployees(data);
  };

  const addEmployee = (employee: Omit<Employee, 'maNhanVien'>) => {
    const newId = generateEmployeeId(employees);
    const newEmployee: Employee = { ...employee, maNhanVien: newId };
    addEmp(newEmployee);
    loadEmployees();
  };

  const updateEmployee = (employee: Employee) => {
    updateEmp(employee);
    loadEmployees();
  };

  const deleteEmployee = (maNhanVien: string) => {
    deleteEmp(maNhanVien);
    loadEmployees();
  };

  return {
    employees: filteredEmployees,
    searchTerm,
    setSearchTerm,
    chucVuFilter,
    setChucVuFilter,
    phongBanFilter,
    setPhongBanFilter,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};