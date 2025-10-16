import SuperAdmin from "../schemas/superAdmin/superadmin.schema";
import bcrypt from "bcryptjs";

export const findSuperAdmin = async (query: any) => {
    try {
        const admin = await SuperAdmin.findOne(query);
        if (admin) {
            return { status: "info", statusCode: 300, message: "SuperAdmin already exists", data: admin };
        } else {
            return { status: "success", statusCode: 200, message: "SuperAdmin not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const createSuperAdmin = async (data: any) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newAdmin = new SuperAdmin({ ...data, password: hashedPassword });
        const savedAdmin = await newAdmin.save();
        return { status: "success", statusCode: 201, message: "SuperAdmin created successfully", data: savedAdmin };
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const getAllSuperAdmins = async () => {
    try {
        const admins = await SuperAdmin.find();
        return { status: "success", statusCode: 200, message: "SuperAdmins fetched successfully", data: admins };
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const getSuperAdminById = async (id: string) => {
    try {
        const admin = await SuperAdmin.findById(id);
        if (admin) {
            return { status: "success", statusCode: 200, message: "SuperAdmin found", data: admin };
        } else {
            return { status: "info", statusCode: 404, message: "SuperAdmin not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const updateSuperAdmin = async (id: string, data: any) => {
    try {
        if (data.password) data.password = await bcrypt.hash(data.password, 10);
        const updated = await SuperAdmin.findByIdAndUpdate(id, data, { new: true });
        if (updated) {
            return { status: "success", statusCode: 200, message: "SuperAdmin updated successfully", data: updated };
        } else {
            return { status: "info", statusCode: 404, message: "SuperAdmin not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};

export const deleteSuperAdmin = async (id: string) => {
    try {
        const deleted = await SuperAdmin.findByIdAndDelete(id);
        if (deleted) {
            return { status: "success", statusCode: 200, message: "SuperAdmin deleted successfully", data: deleted };
        } else {
            return { status: "info", statusCode: 404, message: "SuperAdmin not found", data: null };
        }
    } catch (err: any) {
        return { status: "error", statusCode: 500, message: err?.message, data: err?.message };
    }
};