import { Employee } from '../models/employee';

export function generateEmployeeId(list: Employee[]): string {
  if (list.length === 0) {
    return 'NV001';
  }
  const ids = list.map(e => parseInt(e.maNhanVien.slice(2)));
  const maxId = Math.max(...ids);
  const nextId = maxId + 1;
  return `NV${nextId.toString().padStart(3, '0')}`;
}