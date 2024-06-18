import { RowDataPacket } from "mysql2";

export interface UserRow extends RowDataPacket {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}
