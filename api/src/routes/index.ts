import "express";
import { Router } from "express";
import { getBaseNft, getUserNft, createAndUpdateNft } from "../controller/server";

const router = Router();

router.get('/getBaseNft', getBaseNft);
router.get('/getUserNft', getUserNft);
router.post('/createUserNft', createAndUpdateNft);

export default router;
