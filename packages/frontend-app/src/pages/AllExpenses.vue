<template>
    <div>
        <base-title>Wszystkie koszta budżetu</base-title>
        <base-error v-if="error">{{ error }}</base-error>
        <div v-else-if="loading">Loading...</div>
        <base-ul v-else-if="expenses.length" title="Wszytkie koszta budżetu">
            <expense-list-item
                v-for="expense in expenses"
                :key="expense.id"
                :id="expense.id"
                :amount="expense.amount"
                :user_id="expense.user_id"
                :date="expense.date"
                :rolePriority="rolePriority"
            ></expense-list-item>
        </base-ul>
        <base-info v-else title="Brak kosztów">Budżet aktualnie nie posiada żadnych kosztów.</base-info>
    </div>
</template>

<script>
import { computed, watch } from 'vue';
import useFetch from '../hooks/useFetch';
import { useRoute } from 'vue-router';
import { useStore} from 'vuex';
import ExpenseListItem from '../components/pages/ExpenseListItem.vue';

export default {
    components: {
        ExpenseListItem
    },
    setup(){
        const route = useRoute();
        const store = useStore();
        const budgetId = route.params?.budgetId;
        const fetchExpenses = useFetch('/api/budgets/'+budgetId+'/expenses');
        const loading = computed(()=> fetchExpenses.loading.value);
        const expenses = computed(()=> fetchExpenses.data.value?.expenses ?? []);

        const isNeededRefresh = computed(()=> store.getters['refresh/isRefreshExpensesNeeded']);
        watch( isNeededRefresh, () => {
            if (!isNeededRefresh.value) return;
            fetchExpenses.refetch()
        })
        const rolePriority = computed(()=> fetchExpenses.data.value?.rolePriority ?? 100);
        const error = computed( ()=> fetchExpenses.error.value)
        
        return {
            loading,
            expenses,
            error,
            rolePriority
        }
    }
}
</script>