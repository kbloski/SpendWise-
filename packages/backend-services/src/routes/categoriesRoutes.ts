import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import CategoryType from "../types/CategoryType";
import { budgetController, budgetSharesController, categoryController } from "../controllers/controllers";
import { isNumber } from "../utils/utils";
import Budget from "../models/BudgetModel";

const router = Router();

router.post(buildApiPath("categories"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { name, budget_id }: Partial<CategoryType> = req.body;
        if (!name || !budget_id) return sendErrorResponse(res, 404);

        const budgetExist = await budgetController.getById(Number(budget_id));

        if (!budgetExist) return sendErrorResponse(res, 404, "Budget with id: "+budget_id+" not exist");

        const newCategory = await categoryController.create({
            budget_id: Number(budget_id),
            name: String(name),
        });
        if (!newCategory) throw new Error("Cannot create category");
        return sendSuccessResponse(res, 201);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

router.get(
    buildApiPath("categories", ":id"),
    async (req, res) => {
        try {
            // if (!req.user) throw new Error("req.user is empty")
            // const { id } = req.params;
            // if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid id");
    
            // const category = await categoryController.getById( Number(id) );
            // if (!category) return sendErrorResponse(res, 404);
    
            // const accessToCategory = await categoryController.isAccessibleCategoryForUser( category, req.user )

            return sendSuccessResponse(res, 200, {
                // category: accessToCategory
            })
        } catch (err){
            return sendErrorResponse( res, 500)
        }
    }
);


export default router;
