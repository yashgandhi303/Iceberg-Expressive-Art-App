import "express"
import { app } from "../app"

import { Router } from "express"
import { getBaseNft, getUserNft, createNft, updateNft} from "../controller/server";


const router = Router();

router.get('/basenft', getBaseNft);
router.get('/usernft', getUserNft);
router.post('/createnft', createNft);
router.put('/updatenft', updateNft);

export default router;
