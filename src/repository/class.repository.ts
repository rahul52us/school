import Class from "../schemas/class/class.schema"; // Assuming Class schema exists

export const findClass = async (data: any) => {
    try {
        const classData = await Class.findOne(data);
        if (classData) {
            return {
                status: "info",
                statusCode: 300,
                message: "Class is already registered",
                data: classData,
            };
        } else {
            return {
                status: "success",
                statusCode: 200,
                message: "Class does not exist",
                data: null,
            };
        }
    } catch (err: any) {
        return {
            status: "error",
            statusCode: 500,
            message: err?.message,
            data: err?.message,
        };
    }
};

export const createClass = async (data: any) => {
    try {
        const classDetails = new Class(data);
        const savedClass = await classDetails.save();
        return {
            status: "success",
            statusCode: 201,
            message: "Class has been created successfully",
            data: savedClass,
        };
    } catch (err: any) {
        return {
            status: "error",
            statusCode: 500,
            message: err?.message,
            data: err?.message,
        };
    }
};

export const findAllClasses = async (filters: any = {}) => {
    try {
        const classes = await Class.find(filters);
        return {
            status: "success",
            statusCode: 200,
            message: "Classes fetched successfully",
            data: classes,
        };
    } catch (err: any) {
        return {
            status: "error",
            statusCode: 500,
            message: err?.message,
            data: err?.message,
        };
    }
};

export const findClassById = async (id: string) => {
    try {
        const classData = await Class.findById(id);
        if (classData) {
            return {
                status: "success",
                statusCode: 200,
                message: "Class found",
                data: classData,
            };
        } else {
            return {
                status: "info",
                statusCode: 404,
                message: "Class not found",
                data: null,
            };
        }
    } catch (err: any) {
        return {
            status: "error",
            statusCode: 500,
            message: err?.message,
            data: err?.message,
        };
    }
};

export const updateClass = async (id: string, data: any) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(id, data, { new: true });
        if (updatedClass) {
            return {
                status: "success",
                statusCode: 200,
                message: "Class updated successfully",
                data: updatedClass,
            };
        } else {
            return {
                status: "info",
                statusCode: 404,
                message: "Class not found",
                data: null,
            };
        }
    } catch (err: any) {
        return {
            status: "error",
            statusCode: 500,
            message: err?.message,
            data: err?.message,
        };
    }
};

export const deleteClass = async (id: string) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(id);
        if (deletedClass) {
            return {
                status: "success",
                statusCode: 200,
                message: "Class deleted successfully",
                data: deletedClass,
            };
        } else {
            return {
                status: "info",
                statusCode: 404,
                message: "Class not found",
                data: null,
            };
        }
    } catch (err: any) {
        return {
            status: "error",
            statusCode: 500,
            message: err?.message,
            data: err?.message,
        };
    }
};
