import mongoose, { PopulateOptions } from 'mongoose';
import Class, { IClass } from '../schemas/class/class.schema';

interface ClassFilters {
    name?: string;
    grade?: string;
    section?: string;
    academicYear?: string;
    school?: string;
    isActive?: boolean;
    [key: string]: any;
}

interface QueryOptions {
    populate?: string | PopulateOptions | (string | PopulateOptions)[];
    sort?: string | Record<string, 1 | -1>;
    page?: string | number;
    limit?: string | number;
    select?: string;
}

const findAll = async (filters: ClassFilters = {}, options: any): Promise<IClass[]> => {
    const query = Class.find(filters);

    if (options.populate) query.populate(options.populate);
    if (options.sort) query.sort(options.sort);
    if (options.select) query.select(options.select);

    if (options.page && options.limit) {
        const page = Math.max(parseInt(options.page.toString(), 10), 1);
        const limit = Math.max(parseInt(options.limit.toString(), 10), 1);
        query.skip((page - 1) * limit).limit(limit);
    }

    return query.exec();
};

const findById = async (id: string, populate?: any | PopulateOptions | (string | PopulateOptions)[]): Promise<IClass | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const query = Class.findById(id);
    if (populate) query.populate(populate);
    return query.exec();
};

const findBySchool = async (schoolId: string, options: any): Promise<IClass[]> => {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) return [];
    const query = Class.find({ school: schoolId });

    if (options.sort) query.sort(options.sort);
    if (options.populate) query.populate(options.populate);

    return query.exec();
};

const create = async (classData: Partial<IClass>): Promise<IClass> => {
    return Class.create(classData);
};

const update = async (id: string, classData: Partial<IClass>): Promise<IClass | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Class.findByIdAndUpdate(id, classData, { new: true, runValidators: true }).exec();
};

const deleteClass = async (id: string): Promise<IClass | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Class.findByIdAndDelete(id).exec();
};

const count = async (filters: ClassFilters = {}): Promise<number> => {
    return Class.countDocuments(filters).exec();
};

export default {
    findAll,
    findById,
    findBySchool,
    create,
    update,
    delete: deleteClass,
    count
};
