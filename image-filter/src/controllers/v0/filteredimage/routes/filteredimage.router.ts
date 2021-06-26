import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../../util/util';
import fs from 'fs';


const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const imageUrl = req.query.image_url;
    if (!imageUrl) {
        return res.status(400).send({ message: 'Image Url is required.' });
    }
    try {
        const filteredImage = await filterImageFromURL(imageUrl);
        console.log(filteredImage);
        fs.readFile(filteredImage, (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(data);
        });
    } catch (error) {
        console.error(error);
        res.send(500).send(error.message);
    }
});

export const FilteredImageRouter: Router = router;