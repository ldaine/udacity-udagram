import { Router } from 'express';
import { FilteredImageRouter } from './filteredimage';

const router: Router = Router();

router.use('/filteredimage', FilteredImageRouter);

export const IndexRouter: Router = router;