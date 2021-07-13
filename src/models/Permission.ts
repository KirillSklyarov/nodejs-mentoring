export const permissions = [
  'READ',
  'WRITE',
  'DELETE',
  'SHARE',
  'UPLOAD_FILES',
] as const;
export type Permission = typeof permissions[number];
