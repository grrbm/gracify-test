import { Table, Column, Model, Index, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table
export class User extends Model {
  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  phonenumber!: string;
}
export default User;
