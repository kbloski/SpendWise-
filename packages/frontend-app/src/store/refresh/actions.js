export default {
  triggerRefreshUser(ctx, _) {
    ctx.commit("SET_REFRESH__USER_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__USER_NEEDED", false), 0);
  },
  triggerRefreshBudgets(ctx, _) {
    ctx.commit("SET_REFRESH__BUDGETS_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__BUDGETS_NEEDED", false), 0);
  },

  triggerRefreshCategories(ctx, _) {
    ctx.commit("SET_REFRESH__CATEGORIES_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__CATEGORIES_NEEDED", false), 0);
  },

  triggerRefreshExpenses(ctx, _) {
    ctx.commit("SET_REFRESH__EXPENSES_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__EXPENSES_NEEDED", false), 0);
  },
  triggerRefreshShares(ctx, _) {
    ctx.commit("SET_REFRESH__SHARES_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__SHARES_NEEDED", false), 0);
  },
};
