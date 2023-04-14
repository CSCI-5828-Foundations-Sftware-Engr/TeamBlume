import { scrapeAmazon } from "../../../core/electronics.js";
import { NextApiRequest, NextApiResponse } from 'next';
import { bullmq } from 'bullmq';


const getElectronics = async (_req: NextApiRequest, res: NextApiResponse) => {

    

    const electronics = await scrapeAmazon();
    res.status(200).json({ electronics });
    
}

export default getElectronics;

