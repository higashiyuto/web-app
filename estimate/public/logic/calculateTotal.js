import { state } from '../state.js';
import { updateTotalDisplay } from '../ui/display.js';

export function calculateTotal() {
    const total = 
        (state.kaedoki.enabled ? state.kaedoki.monthlyPrice : 0) +
        (state.normal.enabled  ? state.normal.monthlyPrice  : 0) -
        (state.discount.enabled ? state.discount.amount : 0);

    state.total = total;
    updateTotalDisplay(state.total);
}