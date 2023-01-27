import { Router,Response } from "express";
import userController from "../controllers/userApiController";
import { ValidateToken, ValidateTokenAndAdmin, ValidateTokenAndAuthorization,authenticate } from "../middleware/authenticate";
const router: Router = Router();

//server started and api running
router.get('/',authenticate, (req, res) => {
    if (localStorage.getItem("jwt")) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

router.get('/register',authenticate, (req, res) => {
    res.render('register.ejs');
});

router.post('/register',authenticate, userController.register);

router.get('/login',authenticate, (req, res) => {
    res.render('login.ejs');
});

router.get('/logout', (req, res) => {
    localStorage.clear();
    res.redirect('/login');
});

router.post('/login',authenticate, userController.login);

router.post('/forgotPassword', ValidateToken, userController.forgotPassword);

router.get('/find/:id', ValidateToken, userController.getUser);

router.get('/all', ValidateTokenAndAdmin, userController.getAllUser);

router.put('/update/:id', ValidateTokenAndAuthorization, userController.update);

router.delete('/delete/:id', ValidateTokenAndAdmin, userController.deleteUser);

router.get('/stats', ValidateToken, userController.getUserStats);

export default router;