import { Request, Response } from "express";
import * as userService from "../services/userService";
import { User, UserRow } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";
import { config } from "../config/config";

//Register User
export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const { user, token } = await userService.register(
      username,
      password,
      email
    );
    res
      .status(201)
      .json({ data: { user, token }, message: "User Created Successfully!" });
  } catch (error: any) {
    console.error("Registration Error:", error); // Log the error
    res.status(400).json({ message: error.message });
  }
};
//Login User
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await userService.login(username, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Users
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get User by ID
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(parseInt(id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Update User
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    const updatedUser = await userService.update(id, {
      username,
      password,
      email,
    });
    res
      .status(200)
      .json({ data: updatedUser, message: "User Updated Successfully!" });
  } catch (error: any) {
    console.error("Update Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete User
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.remove(id);
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (error: any) {
    console.error("Deletion Error:", error);
    res.status(400).json({ message: error.message });
  }
};
