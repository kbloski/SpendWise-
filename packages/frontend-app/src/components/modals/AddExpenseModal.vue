<template>
    <button class="btn-success" @click="openModal">Create expense</button>
    <base-modal :visible="false" ref="categoryModal">
        <template v-slot:header> Expense create </template>
        <template v-slot:default>
            <base-error v-if="error"> {{  error }}</base-error>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <base-form-control v-model="description">Description</base-form-control>
                <base-form-control v-model="amount">Amount (number)</base-form-control>
                <br />
                <base-button @click="createExpense">Create</base-button>
            </div>
        </template>
    </base-modal>
</template>

<script>
import { computed, ref, watch } from "vue";
import usePost from "../../hooks/usePost.js";
import { useStore } from "vuex";

export default {
    props: {
        budgetId: {
            required: true,
        },
        categoryId : {
            required: true
        }
    },
    setup(props) {
        const store = useStore();

        const categoryModal = ref(null);
        const postExpense = usePost("/api/budgets/" + props.budgetId + "/categories/" + props.categoryId + '/expenses');
        const description = ref("");
        const amount = ref("");

        function openModal() {
            categoryModal.value.openModal();
        }
        
        async function createExpense() {
            postExpense.postData({ 
                description: description.value,
                amount: Number(amount.value)
            });
        }
        
        watch(postExpense.response, () => {
            if (!postExpense.response.ok) return;
            postExpense.clearResponse()
            description.value = ""
            amount.value = ""

            store.dispatch("refresh/triggerRefreshExpenses");
            categoryModal.value.closeModal();
        });

        return {
            error: postExpense.error,
            loading: postExpense.loading,
            categoryModal,
            openModal,
            createExpense,
            amount,
            description
        };
    },
};
</script>

<style scoped>
.container {
    padding-bottom: 1rem;
}
</style>
