import { reviewModel } from "../../DB/model/review.model.js";
import { asynchandler } from "../../utils/response/error.response.js";

export const addReview = asynchandler(async (req, res, next) => {
    const { targetId, onModel, content, rating } = req.body;


    const checkReview = await reviewModel.findOne({
        user: req.user._id,
        targetId,
        onModel
    });

    if (checkReview) {
        return next(new Error("You already reviewed this!", { cause: 400 }));
    }

    const review = await reviewModel.create({
        content,
        rating,
        targetId,
        onModel,
        user: req.user._id
    });

    return res.status(201).json({ message: "done", review });
});


export const getReviews = asynchandler(async (req, res, next) => {
    const { targetId } = req.params;
    const reviews = await reviewModel.find({ targetId })
        .populate("user", "username image")
        .sort("-createdAt");

    return res.status(200).json({ message: "done", reviews });
});

