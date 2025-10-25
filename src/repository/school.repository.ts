import School from "../schemas/school/school.schema";

export const findSchool = async (data: any) => {
  try {
    const schoolName = await School.findOne(data);
    if (schoolName) {
      return {
        status: "success", // Changed from "info"
        statusCode: 200,   // Changed from 300
        message: "School Name is already registered",
        data: schoolName,
      };
    } else {
      return {
        status: "error",   // Changed from "success"
        statusCode: 404,   // Changed from 200
        message: "School Name does not exist",
        data: null,        // Changed from string to null
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

export const createSchool = async (data: any) => {
  try {
    const schoolDetails = new School(data);
    const savedSchool = await schoolDetails.save();
    return {
      status: "success",
      statusCode: 201,
      message: "School has been created successfully",
      data: savedSchool,
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

export const findAllSchools = async (filters: any = {}) => {
  try {
    const schools = await School.find(filters);
    return {
      status: "success",
      statusCode: 200,
      message: "Schools fetched successfully",
      data: schools,
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

export const findSchoolById = async (id: string) => {
  try {
    const school = await School.findById(id);
    if (school) {
      return {
        status: "success",
        statusCode: 200,
        message: "School found",
        data: school,
      };
    } else {
      return {
        status: "error", // Changed from "info"
        statusCode: 404,
        message: "School not found",
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

export const updateSchool = async (id: string, data: any) => {
  try {
    const updatedSchool = await School.findByIdAndUpdate(id, data, { new: true });
    if (updatedSchool) {
      return {
        status: "success",
        statusCode: 200,
        message: "School updated successfully",
        data: updatedSchool,
      };
    } else {
      return {
        status: "error", // Changed from "info"
        statusCode: 404,
        message: "School not found",
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

export const deleteSchool = async (id: string) => {
  try {
    const deletedSchool = await School.findByIdAndDelete(id);
    if (deletedSchool) {
      return {
        status: "success",
        statusCode: 200,
        message: "School deleted successfully",
        data: deletedSchool,
      };
    } else {
      return {
        status: "error", // Changed from "info"
        statusCode: 404,
        message: "School not found",
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
}