import { orderModel } from "../../DB/model/order.model.js";
import { petModel } from "../../DB/model/pet.model.js";
import { asynchandler } from "../../utils/response/error.response.js";


export const createOrder = asynchandler(async (req, res, next) => {
    const { orderType, products, pet, address, phone } = req.body;
    let totalPrice = 0;


    if (orderType === 'Adoption') {
        if (!pet) return next(new Error("Pet ID is required for adoption", { cause: 400 }));

        const checkPet = await petModel.findOne({ _id: pet, isAdopted: false });
        if (!checkPet) return next(new Error("Pet not available or already adopted", { cause: 404 }));


    }

    const order = await orderModel.create({
        user: req.user._id,
        orderType,
        products,
        pet,
        totalPrice: req.body.totalPrice || 0,
        address,
        phone
    });

    return res.status(201).json({ message: "done", order });
});


export const getMyOrders = asynchandler(async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id })
        .populate('pet')
        .populate('products.product');

    return res.status(200).json({ message: "done", orders });
});


export const getOrderById = asynchandler(async (req, res, next) => {
    const order = await orderModel.findOne({ _id: req.params.id, user: req.user._id })
        .populate('pet')
        .populate('products.product');

    if (!order) return next(new Error("Order not found", { cause: 404 }));
    return res.status(200).json({ message: "done", order });
});


export const updateOrder = asynchandler(async (req, res, next) => {
    const order = await orderModel.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
    );

    if (!order) return next(new Error("Order not found", { cause: 404 }));
    return res.status(200).json({ message: "done", order });
});

export const cancelOrder = asynchandler(async (req, res, next) => {
    const order = await orderModel.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
        status: 'pending'
    });

    if (!order) return next(new Error("Cannot cancel order (Not found or already processed)", { cause: 400 }));
    return res.status(200).json({ message: "done" });
});