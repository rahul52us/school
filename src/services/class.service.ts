import { NextFunction, Response } from "express";
import { 
    createClass, 
    findClass, 
    findAllClasses, 
    findClassById, 
    updateClass, 
    deleteClass 
} from "../repository/class.repository";

export const createClassService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = req.userId;

        const { status, statusCode, data, message } = await findClass({ name: req.body.name });

        if (status === "success" && data) {
            return res.status(400).send({
                status: "error",
                statusCode: 400,
                message: "Class already exists",
                data
            });
        }

        const response = await createClass({ ...req.body, createdBy: user });

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

export const getAllClassesService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const response = await findAllClasses(req.query);
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

export const getClassByIdService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const response = await findClassById(req.params.id);
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

export const updateClassService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const response = await updateClass(req.params.id, req.body);
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

export const deleteClassService = async (req: any, res: Response, next: NextFunction) => {
    try {
        const response = await deleteClass(req.params.id);
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
