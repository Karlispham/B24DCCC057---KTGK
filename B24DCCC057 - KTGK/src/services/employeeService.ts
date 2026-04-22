import { Employee, TrangThai } from '../models/employee';

const STORAGE_KEY = 'employee_management_data';

// Danh mục chuẩn để đồng nhất dữ liệu
export const PHONG_BAN_OPTIONS = [
  'Ban Giám đốc',
  'Phòng IT',
  'Phòng Hành chính - Nhân sự',
  'Phòng Kế toán - Tài chính',
  'Phòng Marketing',
  'Phòng Kinh doanh',
  'Phòng Pháp chế',
  'Phòng R&D',
  'Phòng Chăm sóc khách hàng',
  'Phòng Sản xuất',
  'Phòng Đảm bảo chất lượng (QA)'
];

export const CHUC_VU_OPTIONS = [
  'Tổng Giám đốc',
  'Giám đốc điều hành',
  'Trưởng phòng',
  'Phó phòng',
  'Kỹ sư phần mềm',
  'Chuyên viên Marketing',
  'Nhân viên kinh doanh',
  'Kế toán trưởng',
  'Kế toán viên',
  'Nhân viên hành chính',
  'Thực tập sinh',
  'Kiểm soát viên chất lượng',
  'Kỹ thuật viên'
];

const initialEmployees: Employee[] = [
  {
    maNhanVien: 'NV001',
    hoTen: 'Trần Văn Hoàng',
    chucVu: 'Kỹ sư phần mềm',
    phongBan: 'Phòng IT',
    luong: 10000000,
    trangThai: TrangThai.DAKYHOPDONG,
  },
  {
    maNhanVien: 'NV002',
    hoTen: 'Trần Thị Ly',
    chucVu: 'Trưởng phòng',
    phongBan: 'Phòng Hành chính - Nhân sự',
    luong: 15000000,
    trangThai: TrangThai.THUVIEC,
  },
  {
    maNhanVien: 'NV003',
    hoTen: 'Lê Văn Luyện',
    chucVu: 'Tổng Giám đốc',
    phongBan: 'Ban Giám đốc',
    luong: 20000000,
    trangThai: TrangThai.NGHIPHEP,
  },
  {
    maNhanVien: 'NV004',
    hoTen: 'Nguyễn Bích Phương',
    chucVu: 'Chuyên viên Marketing',
    phongBan: 'Phòng Marketing',
    luong: 12000000,
    trangThai: TrangThai.DAKYHOPDONG,
  },
  {
    maNhanVien: 'NV005',
    hoTen: 'Phạm Thành Long',
    chucVu: 'Nhân viên kinh doanh',
    phongBan: 'Phòng Kinh doanh',
    luong: 9000000,
    trangThai: TrangThai.THUVIEC,
  },
  {
    maNhanVien: 'NV006',
    hoTen: 'Ngô Kiến Huy',
    chucVu: 'Chuyên viên Marketing',
    phongBan: 'Phòng Marketing',
    luong: 11000000,
    trangThai: TrangThai.DAKYHOPDONG,
  },
  {
    maNhanVien: 'NV007',
    hoTen: 'Đặng Thu Thảo',
    chucVu: 'Kế toán trưởng',
    phongBan: 'Phòng Kế toán - Tài chính',
    luong: 18000000,
    trangThai: TrangThai.DAKYHOPDONG,
  },
];

const loadEmployees = (): Employee[] => {
  if (typeof window === 'undefined') return initialEmployees;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return initialEmployees;
    }
  }
  return initialEmployees;
};

const saveEmployees = (data: Employee[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

let employees: Employee[] = loadEmployees();

export const getEmployees = (): Employee[] => {
  return [...employees];
};

export const addEmployee = (employee: Omit<Employee, 'maNhanVien'>): void => {
  // Tạo mã nhân viên mới không trùng lặp
  const maxId = employees.length > 0 
    ? Math.max(...employees.map(e => parseInt(e.maNhanVien.replace('NV', '')))) 
    : 0;
  const newMaNV = `NV${(maxId + 1).toString().padStart(3, '0')}`;
  
  const newEmployee: Employee = {
    ...employee,
    maNhanVien: newMaNV
  };
  employees.push(newEmployee);
  saveEmployees(employees);
};

export const updateEmployee = (employee: Employee): void => {
  const index = employees.findIndex(e => e.maNhanVien === employee.maNhanVien);
  if (index !== -1) {
    employees[index] = employee;
    saveEmployees(employees);
  }
};

export const deleteEmployee = (maNhanVien: string): void => {
  const employee = employees.find(e => e.maNhanVien === maNhanVien);
  if (!employee) {
    throw new Error('Nhân viên không tồn tại.');
  }
  employees = employees.filter(e => e.maNhanVien !== maNhanVien);
  saveEmployees(employees);
};