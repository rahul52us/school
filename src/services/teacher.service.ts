import { createTeacher, findTeacher, findAllTeachers, findTeacherById, updateTeacher, deleteTeacher } from "../repository/teacher.repository";
import { NextFunction, Response } from "express";

export const createTeacherService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = req.userId;
        const { status, statusCode, data, message } = await findTeacher({ email: req.body.email });

        if (status === "success") {
            const { status, statusCode, message, data } = await createTeacher({ ...req.body, createdBy: user });
            return res.status(statusCode).send({ message, data, status });
        } else {
            return res.status(statusCode).send({ message, data, status });
        }
    } catch (err: any) {
        next(err);
    }
};

export const getAllTeachersService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { status, statusCode, data, message } = await findAllTeachers(req.query);
        return res.status(statusCode).send({ message, data, status });
    } catch (err: any) {
        next(err);
    }
};

export const getTeacherByIdService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { status, statusCode, data, message } = await findTeacherById(req.params.id);
        return res.status(statusCode).send({ message, data, status });
    } catch (err: any) {
        next(err);
    }
};

export const updateTeacherService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { status, statusCode, data, message } = await updateTeacher(req.params.id, req.body);
        return res.status(statusCode).send({ message, data, status });
    } catch (err: any) {
        next(err);
    }
};

export const deleteTeacherService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { status, statusCode, data, message } = await deleteTeacher(req.params.id);
        return res.status(statusCode).send({ message, data, status });
    } catch (err: any) {
        next(err);
    }
};
