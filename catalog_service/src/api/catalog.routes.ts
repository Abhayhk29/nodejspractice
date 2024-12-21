// import express, { NextFunction, Request, Response } from "express";

// const router = express.Router();

// // endpoints
// router.post(
//     "/product",
//     async (req: Request, res: Response, next: NextFunction) => {
//         return res.status(201).json({})
//     }
// )


// export default router;

import express, { Request, Response, NextFunction } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { BrokerService } from "../services/broker.service";

const router = express.Router();

export const catalogServices = new CatalogService(new CatalogRepository);
const brokerService = new BrokerService(catalogServices);
brokerService.initializeBroker();

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { errors, input } = await RequestValidator(CreateProductRequest, req.body);

      if (errors) return res.status(400).json(errors);

      const data = await catalogServices.createProduct(input);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
    // try {
    //   const productData = req.body;

    //   // Process productData here (e.g., save to a database)

    //   return res.status(201).json({
    //     message: "Product created successfully",
    //     product: productData,
    //   });
    // } catch (error) {
    //   next(error); // Pass the error to the error-handling middleware
    // }
  }
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { errors, input } = await RequestValidator(UpdateProductRequest, req.body);

      const id = parseInt(req.params.id) || 0;

      if (errors) return res.status(400).json(errors);

      const data = await catalogServices.updateProduct({id, ...input});
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
    // try {
    //   const productData = req.body;

    //   // Process productData here (e.g., save to a database)

    //   return res.status(201).json({
    //     message: "Product created successfully",
    //     product: productData,
    //   });
    // } catch (error) {
    //   next(error); // Pass the error to the error-handling middleware
    // }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
      const data = await catalogServices.getProducts(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      const data = await catalogServices.getProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      const data = await catalogServices.deleteProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
)

router.post("/products/stock", async (req: Request, res:Response) => {
  try {
    const data = await catalogServices.getProductStock(req.body.ids);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
})

export default router;
