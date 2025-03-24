export function isStudentId(id: string) {
  return /^\d{2}[A-Z]\d{5}$/.test(id);
}

export function isEquipmentId(id: string): boolean {
  return /^[a-z0-9]{25,30}$/.test(id);
}
