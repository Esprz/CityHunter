<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown, mdiExportVariant } from '@mdi/js';
import TodoCard from '@/components/TodoCard.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHuntStore } from "@/stores/huntStore";
const huntStore = useHuntStore();
const router = useRouter();
function returnToHunt() {
    router.push('/hunt');
}
const todoList = computed(() =>
    huntStore.huntStores
        .filter(store => store.visited)
        .map(store => ({
            title: store.name
        }))
);

</script>

<template>
    <div class="page-container">
        <div class="page-header">
            <svg-icon @click=returnToHunt type="mdi" :path=mdiChevronDown></svg-icon>
            <h1>Achieved</h1>
            <svg-icon type="mdi" :path=mdiExportVariant></svg-icon>
        </div>

        <ul v-for="(todo, index) in todoList" :key="index" class="achieved-item">
            <TodoCard :title="todo.title" />
        </ul>

    </div>
</template>

<style scoped>
.achieved-item {
    background-color: white;
    margin: 20px;
    padding: 13px;
    border-radius: 10px;

}
</style>