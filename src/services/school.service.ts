import { createSchool, findSchool } from "../repository/school.repository";
import { NextFunction, Response } from "express";

export const createSchoolService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.userId;

    const { status, statusCode, data, message } = await findSchool({
      name: req.body.name,
    });
    if (status === "success") {
      const { status, statusCode, message, data } = await createSchool({
        ...req.body,
        createdBy: user,
      });
      return res.status(statusCode).send({
        message,
        data,
        status,
      });
    } else {
      return res.status(statusCode).send({
        message,
        data,
        status,
      });
    }
  } catch (err: any) {
    next(err);
  }
};
