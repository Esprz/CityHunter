<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import { useMapUIStore } from "@/stores/mapUIStore";
const mapUIStore = useMapUIStore();

import CouponCard from "@/components/CouponCard.vue";

import { useEventStore } from "@/stores/eventStore";
const eventStore = useEventStore();

function claimCoupon(index) {
    if (!eventStore.coupons[index].claimed) {
        eventStore.coupons[index].claimed = true;
    }
}
</script>

<template>
    <div class="page-container">
        <div class="page-header">
            <h1>Rewards</h1>
        </div>

        <div class="coupons-grid">
            <CouponCard v-for="(coupon, index) in eventStore.coupons" :key="index" :title="coupon.title"
                :deal="coupon.deal" :badge="coupon.badge" :claimed="coupon.claimed" @claim="claimCoupon(index)" :showClaim="true" />
        </div>
    </div>

    <NavigationBar v-if="mapUIStore.showNavBar" class="navigation-bar" />
</template>

<style scoped>
.coupons-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 20px;
}
</style>