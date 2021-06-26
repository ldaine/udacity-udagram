import { Router, Request, Response } from 'express';
import { filterImageFromURL, clearFilterImageFolder } from '../../../../util/util';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const imageUrl = req.query.image_url;
    if (!imageUrl) {
        return res.status(400).send({ message: 'Image Url is required.' });
    }
    try {
        const filteredImage = await filterImageFromURL(imageUrl);
        res.sendFile(filteredImage, {}, async (err: any) => {
            console.log('File is send');
            clearFilterImageFolder();
        });
    } catch (error) {
        console.error(error);
        return res.send(500).send(error.message);
    }
});

export const FilteredImageRouter: Router = router;