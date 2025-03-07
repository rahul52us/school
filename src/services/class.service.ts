// services/class/class.service.ts
import classRepository from '../repository/class.repository';
import schoolRepository from '../repository/school.repository';
import { IClass } from '../schemas/class/class.schema';

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
    populate?: string | { path: string; select?: string };
    sort?: string | Record<string, 1 | -1>;
    page?: string | number;
    limit?: string | number;
    select?: string;
}

interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

class ClassService {
    async getAllClasses(filters: ClassFilters = {}, options: QueryOptions = {}): Promise<PaginatedResult<IClass>> {
        try {
            // Default to populating school data
            options.populate = options.populate || 'school';

            const classes = await classRepository.findAll(filters, options);
            const count = await classRepository.count(filters);

            return {
                data: classes,
                total: count,
                page: options.page ? parseInt(options.page.toString(), 10) : 1,
                limit: options.limit ? parseInt(options.limit.toString(), 10) : classes.length
            };
        } catch (error) {
            throw new Error(`Error fetching classes: ${(error as Error).message}`);
        }
    }

    async getClassById(id: string): Promise<IClass> {
        try {
            const classData = await classRepository.findById(id, 'school');

            if (!classData) {
                throw new Error('Class not found');
            }

            return classData;
        } catch (error) {
            throw new Error(`Error fetching class: ${(error as Error).message}`);
        }
    }

    async getClassesBySchool(schoolId: string, options: QueryOptions = {}): Promise<IClass[]> {
        try {
            // Check if school exists
            const school = await schoolRepository.findById(schoolId);

            if (!school) {
                throw new Error('School not found');
            }

            const classes = await classRepository.findBySchool(schoolId, options);

            return classes;
        } catch (error) {
            throw new Error(`Error fetching classes by school: ${(error as Error).message}`);
        }
    }

    async createClass(classData: Partial<IClass>): Promise<IClass> {
        try {
            // Check if school exists
            if (!classData.school) {
                throw new Error('School ID is required');
            }

            const school = await schoolRepository.findById(classData.school.toString());

            if (!school) {
                throw new Error('School not found');
            }

            // Check for duplicate class in same school
            if (classData.grade && classData.section && classData.academicYear) {
                // const existingClasses = await classRepository.findAll({
                //     school: classData.school.toString(),
                //     grade: classData.grade,
                //     section: classData.section,
                //     academicYear: classData.academicYear
                // });

                // if (existingClasses.length > 0) {
                //     throw new Error('A class with the same grade, section, and academic year already exists in this school');
                // }
            }

            return await classRepository.create(classData);
        } catch (error) {
            throw new Error(`Error creating class: ${(error as Error).message}`);
        }
    }

    async updateClass(id: string, classData: Partial<IClass>): Promise<IClass> {
        try {
            const classRecord = await classRepository.findById(id);

            if (!classRecord) {
                throw new Error('Class not found');
            }

            // If school is being updated, check if it exists
            // if (classData.school && classData.school.toString() !== classRecord.school.toString()) {
            //     const school = await schoolRepository.findById(classData.school.toString());

            //     if (!school) {
            //         throw new Error('School not found');
            //     }
            // }

            const updatedClass = await classRepository.update(id, classData);

            if (!updatedClass) {
                throw new Error('Failed to update class');
            }

            return updatedClass;
        } catch (error) {
            throw new Error(`Error updating class: ${(error as Error).message}`);
        }
    }

    async deleteClass(id: string): Promise<void> {
        try {
            const classRecord = await classRepository.findById(id);

            if (!classRecord) {
                throw new Error('Class not found');
            }

            await classRepository.delete(id);
        } catch (error) {
            throw new Error(`Error deleting class: ${(error as Error).message}`);
        }
    }
}

export default new ClassService();