import "express"
import { app } from "../app"

import { Router } from "express"
import { getBaseNft, getUserNft, createOrUpdateUserNFT } from "../controller/server";


const router = Router();

router.get('/getBaseNFT', getBaseNft);
router.get('/getUserNFT', getUserNft);
router.post('/createOrUpdateUserNFT', createOrUpdateUserNFT);
// router.put('/updatenft', updateNft);

export default router;
