import express from "express"
import { addFood, listFood, listAllFood, removeFood, toggleFoodVisibility } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();
//Image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage: storage})
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)           // frontend: chỉ món đang hiển thị
foodRouter.get("/list-all", listAllFood)    // admin: tất cả kể cả đang ẩn
foodRouter.post("/remove", removeFood)
foodRouter.post("/toggle-visibility", toggleFoodVisibility)

export default foodRouter;