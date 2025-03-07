// services/school/school.service.ts
import schoolRepository from '../repository/school.repository';
import { ISchool } from '../schemas/school/school.schema';

interface SchoolFilters {
    name?: string;
    contactEmail?: string;
    isActive?: boolean;
    [key: string]: any;
}

interface QueryOptions {
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

class SchoolService {
    async getAllSchools(filters: SchoolFilters = {}, options: any): Promise<PaginatedResult<ISchool>> {
        try {
            const schools = await schoolRepository.findAll(filters, options);
            const count = await schoolRepository.count(filters);

            return {
                data: schools,
                total: count,
                page: options.page ? parseInt(options.page.toString(), 10) : 1,
                limit: options.limit ? parseInt(options.limit.toString(), 10) : schools.length
            };
        } catch (error) {
            throw new Error(`Error fetching schools: ${(error as Error).message}`);
        }
    }

    async getSchoolById(id: string): Promise<ISchool> {
        try {
            const school = await schoolRepository.findById(id);

            if (!school) {
                throw new Error('School not found');
            }

            return school;
        } catch (error) {
            throw new Error(`Error fetching school: ${(error as Error).message}`);
        }
    }

    async createSchool(schoolData: Partial<ISchool>): Promise<ISchool> {
        try {
            // Check if school with same email already exists
            if (schoolData.contactEmail) {
                const existingSchool = await schoolRepository.findByEmail(schoolData.contactEmail);

                if (existingSchool) {
                    throw new Error('School with this email already exists');
                }
            }

            return await schoolRepository.create(schoolData);
        } catch (error) {
            throw new Error(`Error creating school: ${(error as Error).message}`);
        }
    }

    async updateSchool(id: string, schoolData: Partial<ISchool>): Promise<ISchool> {
        try {
            const school = await schoolRepository.findById(id);

            if (!school) {
                throw new Error('School not found');
            }

            // If email is being updated, check if it's already in use
            if (schoolData.contactEmail && schoolData.contactEmail !== school.contactEmail) {
                const existingSchool = await schoolRepository.findByEmail(schoolData.contactEmail);

                // if (existingSchool && existingSchool._id.toString() !== id) {
                //     throw new Error('School with this email already exists');
                // }
            }

            const updatedSchool = await schoolRepository.update(id, schoolData);

            if (!updatedSchool) {
                throw new Error('Failed to update school');
            }

            return updatedSchool;
        } catch (error) {
            throw new Error(`Error updating school: ${(error as Error).message}`);
        }
    }

    async deleteSchool(id: string): Promise<void> {
        try {
            const school = await schoolRepository.findById(id);

            if (!school) {
                throw new Error('School not found');
            }

            await schoolRepository.delete(id);
        } catch (error) {
            throw new Error(`Error deleting school: ${(error as Error).message}`);
        }
    }
}

export default new SchoolService();