export function updatePriceDisplay(state){
    if(!state) return;

    document.getElementById('device-price').textContent
                                     = `${state.devicePrice.toLocaleString()} 円`;
    document.getElementById('kaedoki-price').textContent
                                     = `${state.kaedoki.price.toLocaleString()} 円 = `;
    document.getElementById('kaedoki-monthly-price').textContent
                                     = `${state.kaedoki.monthlyPrice.toLocaleString()} 円 / 月`;
    document.getElementById('normal-price').textContent
                                     = `${state.normal.price.toLocaleString()} 円 = `;
    document.getElementById('normal-monthly-price').textContent
                                     = `${state.normal.monthlyPrice.toLocaleString()} 円 / 月`;
}

export function updateDiscountDisplay(discount){
    document.getElementById('discount-price').textContent
                                     = ` (${discount} 円)`;
}

export function updateTotalDisplay(total){
    document.getElementById('total-container').textContent
                                    = `${total.toLocaleString()} 円`;
}