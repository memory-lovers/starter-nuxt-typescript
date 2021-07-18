type AuditModel = {
  createAt: number; // timestamp
  updateAt: number; // timestamp
};

export type User = {
  uid: string;
  name: string;
  photoURL: string;
} & AuditModel;
