<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStar, mdiMapCheckOutline, mdiMagnify } from '@mdi/js';
import { useRouter } from 'vue-router';
const router = useRouter();
function goToReward() {
    router.push('/rewards');
}
function goToMyHunt() {
    router.push('/hunt');
}

</script>

<template>
    <div class="navigate-bar-container">
        <div value="my-hunt" class="navigate-bar-item">
            <svg-icon @click=goToMyHunt type="mdi" :path=mdiMapCheckOutline></svg-icon>
            <p>My Hunt</p>

        </div>
        <div value="rewards" class="navigate-bar-item">
            <svg-icon @click=goToReward type="mdi" :path=mdiStar></svg-icon>
            <p>Rewards</p>
        </div>
    </div>
</template>


<style scoped>
.navigate-bar-container {
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
}

.navigate-bar-item {
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;   
}
</style>