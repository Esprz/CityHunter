<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown, mdiExportVariant } from '@mdi/js';
import TodoCard from '@/components/TodoCard.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function returnToHunt() {
    router.push('/hunt');
}
const todoList = ref([
    {
        title: "XXX House",
        distance: 1.23,
        time: 12
    },
    {
        title: "XXX House",
        distance: 1.23,
        time: 12
    }
])

</script>

<template>
    <div class="page-container">
        <div class="page-header">
            <svg-icon @click=returnToHunt type="mdi" :path=mdiChevronDown></svg-icon>
            <h1>To do</h1>
            <svg-icon type="mdi" :path=mdiExportVariant></svg-icon>
        </div>

        <ul v-for="(todo, index) in todoList" :key="index" class="todo-item">
            <TodoCard :title="todo.title" :distance="todo.distance" :time="todo.time" />
        </ul>

    </div>
</template>

<style scoped>
.todo-item {
    background-color: white;
    margin: 20px;
    padding: 13px;
    border-radius: 10px;

}
</style>