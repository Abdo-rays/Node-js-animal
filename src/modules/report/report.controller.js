import { reportModel } from "../../DB/model/report.model.js";
import { petModel } from "../../DB/model/pet.model.js";
import { shopModel } from "../../DB/model/shop.model.js";
import { asynchandler } from "../../utils/response/error.response.js";


export const createReport = asynchandler(async (req, res, next) => {
    const report = await reportModel.create({
        ...req.body,
        reporter: req.user._id
    });
    return res.status(201).json({ message: "done", report });
});


export const deleteReportAndTarget = asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const { deleteTarget } = req.query;

    const report = await reportModel.findById(id);
    if (!report) return next(new Error("Report not found", { cause: 404 }));


    if (deleteTarget === 'true') {
        const targetModel =
            report.onModel === 'Pet' ? petModel :
                report.onModel === 'Product' ? shopModel :
                    null;

        if (targetModel) {
            await targetModel.findByIdAndDelete(report.targetId);
        }
    }


    await reportModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: deleteTarget === 'true' ? "Report and Content deleted" : "Report deleted"
    });
});


export const getAllReports = asynchandler(async (req, res, next) => {
    const reports = await reportModel.find()
        .populate("reporter", "username email")
        .populate("targetId");
    return res.status(200).json({ message: "done", reports });
});