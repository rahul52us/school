import { NextFunction, Response } from "express";
import {
  createSchool,
  findSchool,
  findAllSchools,
  findSchoolById,
  updateSchool,
  deleteSchool
} from "../repository/school.repository";

export const createSchoolService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.userId;

    const { status, statusCode, data, message } = await findSchool({ name: req.body.name });

    if (status === "success" && data) {
      return res.status(400).send({
        status: "error",
        statusCode: 400,
        message: "School already exists",
        data
      });
    }

    const response = await createSchool({ ...req.body, createdBy: user });

    return res.status(response.statusCode).send({
      status: response.status,
      statusCode: response.statusCode,
      message: response.message,
      data: response.data
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllSchoolsService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await findAllSchools(req.query);
    return res.status(response.statusCode).send({
      status: response.status,
      statusCode: response.statusCode,
      message: response.message,
      data: response.data
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSchoolByIdService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await findSchoolById(req.params.id);
    return res.status(response.statusCode).send({
      status: response.status,
      statusCode: response.statusCode,
      message: response.message,
      data: response.data
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSchoolService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await updateSchool(req.params.id, req.body);
    return res.status(response.statusCode).send({
      status: response.status,
      statusCode: response.statusCode,
      message: response.message,
      data: response.data
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSchoolService = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await deleteSchool(req.params.id);
    return res.status(response.statusCode).send({
      status: response.status,
      statusCode: response.statusCode,
      message: response.message,
      data: response.data
    });
  } catch (err: any) {
    next(err);
  }
};
