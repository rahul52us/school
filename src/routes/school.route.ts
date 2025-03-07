// // routes/school/school.routes.ts
// import express, { Request, Response } from 'express';
// import schoolService from '../services/school.service';

// const router = express.Router();

// // Get all schools
// router.get('/', asyncHandler(async (req: Request, res: Response) => {
//     const { page, limit, sort, ...filters } = req.query;

//     const options = {
//         page,
//         limit,
//         sort: sort as string
//     };

//     const result = await schoolService.getAllSchools(filters as any, options);

//     res.status(200).json(result);
// }));

// // Get school by id
// router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
//     const school = await schoolService.getSchoolById(req.params.id);
//     res.status(200).json(school);
// }));

// // Create new school
// router.post('/', asyncHandler(async (req: Request, res: Response) => {
//     const school = await schoolService.createSchool(req.body);
//     res.status(201).json(school);
// }));

// // Update school
// router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
//     const school = await schoolService.updateSchool(req.params.id, req.body);
//     res.status(200).json(school);
// }));

// // Delete school
// router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
//     await schoolService.deleteSchool(req.params.id);
//     res.status(200).json({ message: 'School deleted successfully' });
// }));

// export default router;

// function asyncHandler(arg0: (req: Request, res: Response) => Promise<void>): import("@types/express-serve-static-core").RequestHandler<{}, any, any, import("@types/qs").ParsedQs, Record<string, any>> {
//     throw new Error('Function not implemented.');
// }
