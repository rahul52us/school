import {
  createSuperAdmin,
  findSuperAdmin,
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
} from "../repository/superadmin.repository";
import { NextFunction, Response } from "express";

export const createSuperAdminService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { status, statusCode, data, message } = await findSuperAdmin({ email: req.body.email });
    if (status === "success") {
      const response = await createSuperAdmin(req.body);
      return res.status(response.statusCode).send(response);
    } else {
      return res.status(statusCode).send({ message, data, status });
    }
  } catch (err: any) {
    next(err);
  }
};

export const getAllSuperAdminsService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await getAllSuperAdmins();
    return res.status(response.statusCode).send(response);
  } catch (err: any) {
    next(err);
  }
};

export const getSuperAdminByIdService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await getSuperAdminById(req.params.id);
    return res.status(response.statusCode).send(response);
  } catch (err: any) {
    next(err);
  }
};

export const updateSuperAdminService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await updateSuperAdmin(req.params.id, req.body);
    return res.status(response.statusCode).send(response);
  } catch (err: any) {
    next(err);
  }
};

export const deleteSuperAdminService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await deleteSuperAdmin(req.params.id);
    return res.status(response.statusCode).send(response);
  } catch (err: any) {
    next(err);
  }
};