import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Coupon from "../models/Coupon";

const controller = new Controller();

export async function getCoupons(req: Request, res: Response) {
   try {
      const couponsResponse = await controller.read(new Coupon());

      res.json(couponsResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCoupon(req: Request, res: Response) {
   try {
      const coupon = new Coupon();

      coupon.id = parseInt(req.params.id);

      const couponResponse = await controller.get(coupon);
      res.json(couponResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCoupon(req: Request, res: Response) {
   try {
      const coupon = new Coupon({ ...req.body });

      const couponResponse = await controller.create(coupon);
      res.json(couponResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCoupon(req: Request, res: Response) {
   try {
      const coupon = new Coupon({ ...req.body });

      coupon.id = parseInt(req.params.id);

      const couponResponse = await controller.update(coupon);
      res.json(couponResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCoupon(req: Request, res: Response) {
   try {
      const coupon = new Coupon();

      coupon.id = parseInt(req.params.id);

      const couponResponse = await controller.delete(coupon);
      res.json(couponResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
