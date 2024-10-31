import { Op, Optional } from "sequelize";
import Budget from "../models/BudgetModel";
import User from "../models/UserModel";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { budgetController, budgetSharesController, userController } from "./controllers";

export default class BudgetController extends AbstractCrudController<Budget> {
    constructor() {
        super(Budget);
    }
    async getAccessibleBudgetsForUser( userId: number) {
        const allRelations = await budgetSharesController.getAllforUser( userId )
        if (!allRelations) return null
        const budgetsIds : number[] = []

        allRelations.forEach( r => budgetsIds.push( r.budget_id ))

        return await this.model.findAll({
            where: {
                id: { [Op.in] : budgetsIds}
            }
        })
    }

    async getAllForOwner( ownerId: number) {
        return await this.getAll("DESC", "updatedAt", { user_id: ownerId });
    }

    async create(
        data: Optional<
            Omit<BudgetType, "id" | "createdAt" | "updatedAt">,
            "user_id"
        >
    ): Promise<Budget | null> {
        const userId = data.user_id
        delete data.user_id
        const budgetDb = await super.create( data )
        if (userId && budgetDb){
            const userDB = await userController.getById( userId )
            if (userDB) this.setOwner( budgetDb, userDB )
        } 
        return budgetDb
    }

    async setOwner(budget: BudgetType | Budget, user: UserType | User) {
        const budgetShare = await budgetSharesController.create({
            user_id: user.id,
            budget_id: budget.id,
        });
        const updated = await this.updateById(budget.id, { user_id: user.id });
        return !!updated; // Bool
    }

    async updateById(
        id: number,
        data: Partial<Omit<BudgetType, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
