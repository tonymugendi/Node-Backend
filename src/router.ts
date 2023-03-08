import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "./handlers/product";
import { getSingleUpdate, getUpdates } from "./handlers/update";
import {
  createUpdate,
  deleteUpdate,
  updateUpdate,
} from "./handlers/update-point";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/** * Product */
router.get("/products", getProducts);
router.get("product/:id", getSingleProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/** * Update */
router.get("/updates", (req, res) => getUpdates);
router.get("/update/:id", (req, res) => getSingleUpdate);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.delete("/update/:id", (req, res) => deleteUpdate);

/** * UpdatePoint */
router.get("/updatepoints", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {
  res.json({ message: "Oops that's on us" });
});

export default router;
