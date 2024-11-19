<script setup>
import GeneralButton from './GeneralButton.vue';

defineProps({
    title: String,
    deal: String,
    badge: String,
    claimed: Boolean,
    showClaim: Boolean,
});

const emit = defineEmits(["claim"]);

function handleClaim() {
    emit("claim");
}
</script>

<template>
    <div class="coupon-card">
        <img :src="badge" />
        <div class="deal-banner">{{ deal }}</div>
        <h2 class="coupon-title">{{ title }}</h2>

        <div v-if="showClaim">
            <GeneralButton v-if="!claimed" class="unclaimed" text="Claim" :click-event="handleClaim" />
            <GeneralButton v-else text="Claimed" disabled />
        </div>

    </div>
</template>



<style scoped>
.coupon-card {
    background-color: white;
    border: 1px solid #fce8e4;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 12px;
    position: relative;
}


img {
    width: 80%;
    margin-top: 35px;
}

.deal-banner {
    position: absolute;
    top: 10px;
    left: -5px;
    background: var(--color2);
    color: white;
    font-size: 12px;
    font-weight: 550;
    padding: 4px 10px;
    border-radius: 5px 25px 25px 5px;
}

.coupon-title {
    margin: 8px 0;
}

.unclaimed {
    color: var(--color2);
    background-color: var(--color3);
}
</style>