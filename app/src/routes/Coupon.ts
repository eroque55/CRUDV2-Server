import { Router } from "express";
import {
   getCoupons,
   getCoupon,
   postCoupon,
   putCoupon,
   deleteCoupon,
} from "../handlers/Coupon";

const router = Router();

router.get("/", getCoupons);

router.get("/:name", getCoupon);

router.post("/", postCoupon);

router.put("/:id", putCoupon);

router.delete("/:id", deleteCoupon);

export default router;
