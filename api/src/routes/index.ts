import "express"
import { app } from "../app"

import { Router } from "express"
import { getBaseNft, getUserNft,createAndUpdateNft} from "../controller/server";


const router = Router();

router.get('/basenft', getBaseNft);
router.get('/usernft', getUserNft);
router.post('/cunft', createAndUpdateNft);

export default router;
