<template>
    <div>
        <side-title>My budgets</side-title>
        <base-title>Moje finanse</base-title>
        <add-budget-modal></add-budget-modal>
        <my-budgets-list></my-budgets-list>
        <router-view v-slot="slotProps">
            <transition name="card-route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script>
import MyBudgetsList from "../components/pages/MyBudgetsList.vue";
import AddBudgetModal from '../components/modals/AddBudgetModal.vue'

export default {
    components: {
        AddBudgetModal,
        MyBudgetsList
    },  
};
</script>
