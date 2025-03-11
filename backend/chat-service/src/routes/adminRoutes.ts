import router from "./chatRoutes";
import {addAdmin, addUser, removeAdmin, removeUser} from "../controllers/roomController";

router.post('/remove-user',removeUser);
router.post('/add-user',addUser);
router.post('/remove-admin',removeAdmin);
router.post('/add-admin',addAdmin);