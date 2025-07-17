import { Router } from "express";
import { getContacts, getContact, createContacts, updateContacts, deleteContacts } from "../controllers/contact.controller.js";
import { validateJwtToken } from "../middlewares/validateTokenHandler.js";

const router = Router();

router.use(validateJwtToken);
router.route('/').get(getContacts).post(createContacts);
router.route('/:id').get(getContact).put(updateContacts).delete(deleteContacts);

export default router;