<script setup>
import { useMapUIStore } from '@/stores/mapUIStore';
import GeneralButton from './GeneralButton.vue';
import CouponCard from "@/components/CouponCard.vue";
import { useRouter } from 'vue-router';
import { useEventStore } from '@/stores/eventStore';
const router = useRouter();
const mapUIStore = useMapUIStore()
const eventStore = useEventStore();

const gotoReward = () => {
    mapUIStore.showCouponReedemCard = false;
    router.push('/rewards');
}


const otherHunts = [
    {
        title: "Shopping Daytrip",
        img: "/other_hunts/Shopping_Daytrip.svg"
    },
    {
        title: "City Walk to Coco",
        img: "/other_hunts/City_Walk_to_Coco.svg"
    },
    {
        title: "DIY Trip",
        img: "/other_hunts/DIY_Trip.svg"
    }

]
</script>


<template>
    <v-card class="v-card-style">
        <div>
            <div class="general-reward-card">
                <CouponCard class="coupon" :title="eventStore.coupons[0].title" :deal="eventStore.coupons[0].deal"
                    :badge="eventStore.coupons[0].badge" :showClaim="false" />

                <h2> Your coupon has been added to your rewards</h2>
                <p> Hunts you might be interested: </p>
                <div class="other-hunts">
                    <div v-for="(hunt, index) in otherHunts" :key="index" class="hunt">
                        <img :src="hunt.img" />
                        <p>{{ hunt.title }}</p>
                    </div>
                </div>
                <GeneralButton text="Reedem my rewards" :click-event="gotoReward" />
            </div>
        </div>
    </v-card>
</template>


<style scoped>
.general-reward-card {
    aspect-ratio: 3/5;
    display: flex;
    flex-direction: column;
    padding: 30px;
    gap: 10px;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    position: relative;

    p {
        color: var(--gray);
    }

    .coupon {
        width: 60%;
    }
}

.other-hunts {
    display: flex;
    p{
        color: #602B00;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>