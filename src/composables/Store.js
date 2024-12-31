import { reactive } from 'vue';

// global state, created in module scope
const state = reactive({
    addToCart: [],
    wishList: []
});

export function useState() {
    // local state, created per-component

    return {
        state
    };
}
