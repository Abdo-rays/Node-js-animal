
import { petModel } from "../../DB/model/pet.model.js";
import { asynchandler } from "../../utils/response/error.response.js";

export const addPet = asynchandler(async (req, res, next) => {

    const pet = await petModel.create({
        ...req.body,
        owner: req.user.id
    });

    return res.status(201).json({ message: "done", pet });
});


export const getAllPets = asynchandler(async (req, res, next) => {
    const pets = await petModel.find({ isAdopted: false }).populate("owner", "username email");
    return res.status(200).json({ message: "done", pets });
});

export const getPetById = asynchandler(async (req, res, next) => {
    const pet = await petModel.findById(req.params.id).populate("owner", "username email");
    if (!pet) return next(new Error("Pet not found", { cause: 404 }));
    return res.status(200).json({ message: "Done", pet });
});



export const updatePet = asynchandler(async (req, res, next) => {
    const pet = await petModel.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        req.body,
        { new: true }
    );

    if (!pet) {
        return next(new Error("Pet not found or unauthorized", { cause: 404 }));
    }

    return res.status(200).json({ message: "done", pet });
});

export const deletePet = asynchandler(async (req, res, next) => {
    const pet = await petModel.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!pet) return next(new Error("Pet not found or unauthorized", { cause: 404 }));
    return res.status(200).json({ message: "done" });
});