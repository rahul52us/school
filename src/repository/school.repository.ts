// import School, { ISchool } from '../schemas/school/school.schema';

// interface SchoolFilters {
//   name?: string;
//   contactEmail?: string;
//   isActive?: boolean;
//   [key: string]: any;
// }

// interface QueryOptions {
//   sort?: string | Record<string, 1 | -1>;
//   page?: string | number;
//   limit?: string | number;
//   select?: string;
// }

// const findAll = async (filters: SchoolFilters = {}, options: QueryOptions = {}): Promise<ISchool[]> => {
//   const query = School.find(filters);

//   if (options.sort) {
//     query.sort(options.sort);
//   }

//   if (options.page && options.limit) {
//     const page = parseInt(options.page.toString(), 10) || 1;
//     const limit = parseInt(options.limit.toString(), 10) || 10;
//     const skip = (page - 1) * limit;

//     query.skip(skip).limit(limit);
//   }

//   if (options.select) {
//     query.select(options.select);
//   }

//   return await query.exec();
// };

// const findById = async (id: string): Promise<ISchool | null> => {
//   return await School.findById(id);
// };

// const findByEmail = async (email: string): Promise<ISchool | null> => {
//   return await School.findOne({ contactEmail: email });
// };

// const create = async (schoolData: Partial<ISchool>): Promise<ISchool> => {
//   return await School.create(schoolData);
// };

// const update = async (id: string, schoolData: Partial<ISchool>): Promise<ISchool | null> => {
//   return await School.findByIdAndUpdate(
//     id,
//     schoolData,
//     { new: true, runValidators: true }
//   );
// };

// const deleteSchool = async (id: string): Promise<ISchool | null> => {
//   return await School.findByIdAndDelete(id);
// };

// const count = async (filters: SchoolFilters = {}): Promise<number> => {
//   return await School.countDocuments(filters);
// };

// export default {
//   findAll,
//   findById,
//   findByEmail,
//   create,
//   update,
//   delete: deleteSchool,
//   count
// };