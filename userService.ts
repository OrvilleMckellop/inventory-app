import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";
import { User, UserRow } from "../models/userModel";
import { config } from "../config/config";
import { RowDataPacket } from "mysql2";

/**
 * Register User (CREATE)
 * @param username
 * @param password
 * @param email
 * @returns
 */
export const register = async (
  username: string,
  password: string,
  email: string
): Promise<{ user: User; token: string }> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result]: any = await (
      await db
    ).query("INSERT INTO user (username, password, email) VALUES (?, ?, ?)", [
      username,
      hashedPassword,
      email,
    ]);

    const user: User = {
      id: result.insertId,
      username: username,
      password: hashedPassword,
      email: email,
    };

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return { user, token };
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

/**
 * Login User
 * @param username
 * @param password
 * @returns
 */
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const [rows] = await (
    await db
  ).query<UserRow[]>("SELECT * FROM user WHERE username = ?", [username]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
  return token;
};

//GET All users
export const getUsers = async () => {
  try {
    const [rows] = await (await db).query("SELECT * From user");
    return { data: rows, message: "User Found Successfully!" };
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

//Get User By Id
export const getUserById = async (id: number): Promise<User> => {
  try {
    const [rows] = await (
      await db
    ).query<User[] & RowDataPacket[]>("SELECT * FROM user WHERE id = ?", [id]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    return rows[0];
  } catch (error) {
    throw new Error("Error fetching user: ");
  }
};

// Update User
export const update = async (
  id: string,
  userData: { username: string; password: string; email: string }
) => {
  try {
    const { username, password, email } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result]: any = await (
      await db
    ).query(
      "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?",
      [username, hashedPassword, email, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }

    return { id, username, email }; // Assuming you want to return updated user data
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

// Delete User
export const remove = async (id: string) => {
  try {
    const [result]: any = await (
      await db
    ).query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
