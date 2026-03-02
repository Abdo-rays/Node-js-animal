import { shopModel } from "../../DB/model/shop.model.js";
import { asynchandler } from "../../utils/response/error.response.js";

export const addProduct = asynchandler(async (req, res, next) => {
    const product = await shopModel.create({
        ...req.body,
        seller: req.user._id 
    });
    return res.status(201).json({ message: "done", product });
});


export const getAllProducts = asynchandler(async (req, res, next) => {
    const products = await shopModel.find().populate("seller", "username email");
    return res.status(200).json({ message: "done", products });
});


export const getProductById = asynchandler(async (req, res, next) => {
    const product = await shopModel.findById(req.params.id);
    if (!product) return next(new Error("Product not found", { cause: 404 }));
    return res.status(200).json({ message: "done", product });
});


export const updateProduct = asynchandler(async (req, res, next) => {
    const product = await shopModel.findOneAndUpdate(
        { _id: req.params.id, seller: req.user._id },
        req.body,
        { new: true }
    );
    if (!product) return next(new Error("Product not found or unauthorized", { cause: 404 }));
    return res.status(200).json({ message: "done", product });
});


export const deleteProduct = asynchandler(async (req, res, next) => {
    const product = await shopModel.findOneAndDelete({ _id: req.params.id, seller: req.user._id });
    if (!product) return next(new Error("Product not found or unauthorized", { cause: 404 }));
    return res.status(200).json({ message: "done" });
});