// ui/deviceCheckbox.js
import { state } from '../state.js';
import { updatePriceDisplay } from './display.js';

export function DeviceCheckbox() {
    const kaedokiCheckbox  = document.getElementById('kaedoki-price-checkbox');
    const normalCheckbox   = document.getElementById('normal-price-checkbox');
    const discountCheckbox = document.getElementById('discount-checkbox');

    kaedokiCheckbox.addEventListener('change', () => {
        if (kaedokiCheckbox.checked) {
            // kaedokiをONにすると、normalはOFFに
            state.kaedoki.enabled = true;
            state.normal.enabled = false;
            normalCheckbox.checked = false;
        } else {
            // kaedokiをOFFにしただけなら、他は何もしない
            state.kaedoki.enabled = false;
        }
    });

    normalCheckbox.addEventListener('change', () => {
        if (normalCheckbox.checked) {
            // normalをONにすると、kaedokiはOFFに
            state.normal.enabled = true;
            state.kaedoki.enabled = false;
            kaedokiCheckbox.checked = false;
        } else {
            // normalをOFFにしただけなら、他は何もしない
            state.normal.enabled = false;
        }
    });

    discountCheckbox.addEventListener('change',()=>{
        if(discountCheckbox.checked){
            state.devicePrice   -= state.discount.selectedPrice;
            state.normal.price  -= state.discount.selectedPrice;
            state.normal.monthlyPrice = Math.ceil(state.normal.price/state.installments_num);
            state.kaedoki.price -= state.discount.selectedPrice;
            state.kaedoki.monthlyPrice = Math.ceil(state.kaedoki.price/23);
        }else{
            state.devicePrice   += state.discount.selectedPrice;
            state.normal.price  += state.discount.selectedPrice;
            state.normal.monthlyPrice = Math.ceil(state.normal.price/state.installments_num);
            state.kaedoki.price += state.discount.selectedPrice;
            state.kaedoki.monthlyPrice = Math.ceil(state.kaedoki.price/23);
        }
        updatePriceDisplay(state);
    });
}
