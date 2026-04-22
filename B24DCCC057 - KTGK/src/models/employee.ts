export enum TrangThai {
  THUVIEC = "Thử việc",
  DAKYHOPDONG = "Đã ký hợp đồng",
  NGHIPHEP = "Nghỉ phép",
  DATHOIVIEC = "Đã thôi việc",
}

export interface Employee {
  maNhanVien: string;
  hoTen: string;
  chucVu: string;
  phongBan: string;
  luong: number;
  trangThai: TrangThai;
}