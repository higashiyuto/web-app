import { calculateTotal } from '../logic/calculateTotal.js';
import {state} from '../state.js';
import { updatePriceDisplay, updateTotalDisplay, updateDiscountDisplay } from './display.js';

/**
 * 端末リスト(select要素)にdevices配列の端末名を追加し、
 * 端末名をアルファベット順にソートする設定
 * 最初に「端末を選択」(disabled)を追加する
 */
export function DeviceSelect(devices){
    const select = document.getElementById('device-select');
    select.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.textContent = '端末を選択';
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    devices.sort((a, b) => a.name.localeCompare(b.name));
    devices.forEach((device) => {
        const option = document.createElement('option');
        option.value = device.name;   // ここを index から name に変更
        option.textContent = device.name;
        select.appendChild(option);
    });

    select.addEventListener('change', () => {
        const selectedName = select.value;   // 文字列の端末名を取得
        if(selectedName){
            const selectedDevice = devices.find(d => d.name === selectedName);
            if(selectedDevice){
                state.selectedDevice         = selectedDevice;
                state.devicePrice            = selectedDevice.price;
                state.kaedoki.price          = selectedDevice.kaedoki;
                state.kaedoki.monthlyPrice   = Math.ceil(selectedDevice.kaedoki/23);
                state.normal.price           = selectedDevice.price;
                state.normal.monthlyPrice    = Math.ceil(selectedDevice.price/state.installments_num);
                state.discount.amount.mnp    = selectedDevice.discount.mnp;
                state.discount.amount.new    = selectedDevice.discount.new;
                state.discount.amount.change = selectedDevice.discount.change;

                const contractSelect = document.getElementById('contract-select');
                contractSelect.hidden = false;

                updatePriceDisplay(state);
                calculateTotal();
            }
        }
    });
}

export function InstallmentsSelect(){
    document.getElementById('installments-num').addEventListener('change', (e)=>{
        const selectedValue = Number(e.target.value);
        state.installments_num = selectedValue;
        state.normal.monthlyPrice = Math.ceil(state.normal.price/state.installments_num);

        updatePriceDisplay(state);
        updateTotalDisplay(state.total);
        calculateTotal();
    });
}

export function ContractTypeSelect(){
    const contractSelect = document.getElementById('contract-select');
    
    contractSelect.addEventListener('change', () => {
        state.contractType = contractSelect.value;
        state.discount.type = contractSelect.value;
        
        if(state.discount.type){
            const keyMap = {
                'MNP': 'mnp',
                '新規': 'new',
                '機種変更': 'change',
            };
            const key = keyMap[state.discount.type];
            state.discount.selectedPrice = state.discount.amount[key] || 0;

            const discountContainer = document.getElementById('discount-container');
            discountContainer.style.visibility = 'visible';

            updateDiscountDisplay(state.discount.selectedPrice);
        }
    });
}