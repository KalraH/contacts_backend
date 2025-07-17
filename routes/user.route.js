import { Router } from "express";
import { validateJwtToken } from "../middlewares/validateTokenHandler.js";
import { getAllUsers, createUser, loginUser, getCurrentUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/current').get(validateJwtToken, getCurrentUser);
router.route('/all').get(getAllUsers);

export default router;