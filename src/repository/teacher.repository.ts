import Teacher from "../schemas/teacher/teacher.schema";

export const findTeacher = async (query: any) => {
    try {
        const teacher = await Teacher.findOne(query);
        if (teacher) {
            return { status: "info", statusCode: 300, message: "Teacher already exists", data: teacher };
        } else {
            return { status: "success", statusCode: 200, message: "Teacher not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const createTeacher = async (data: any) => {
    try {
        const teacher = new Teacher(data);
        const savedTeacher = await teacher.save();
        return { status: "success", statusCode: 201, message: "Teacher created successfully", data: savedTeacher };
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const findAllTeachers = async (filters: any = {}) => {
    try {
        const teachers = await Teacher.find(filters);
        return { status: "success", statusCode: 200, message: "Teachers fetched successfully", data: teachers };
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const findTeacherById = async (id: string) => {
    try {
        const teacher = await Teacher.findById(id);
        if (teacher) {
            return { status: "success", statusCode: 200, message: "Teacher found", data: teacher };
        } else {
            return { status: "info", statusCode: 404, message: "Teacher not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const updateTeacher = async (id: string, data: any) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, data, { new: true });
        if (updatedTeacher) {
            return { status: "success", statusCode: 200, message: "Teacher updated successfully", data: updatedTeacher };
        } else {
            return { status: "info", statusCode: 404, message: "Teacher not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const deleteTeacher = async (id: string) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        if (deletedTeacher) {
            return { status: "success", statusCode: 200, message: "Teacher deleted successfully", data: deletedTeacher };
        } else {
            return { status: "info", statusCode: 404, message: "Teacher not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};
