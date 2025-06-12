// src/load.js
import { state } from './state.js';
import { fetchDevices } from './api.js';
import { updatePriceDisplay, updateTotalDisplay } from './ui/display.js';
import { calculateTotal } from './logic/calculateTotal.js';
import { notify } from './state.js';

export async function loadEstimateFromLocalStorage() {
  const raw = localStorage.getItem('loadedEstimate');
  if (!raw) return;

  try {
    const estimate = JSON.parse(raw);
    localStorage.removeItem('loadedEstimate');

    const devices = await fetchDevices();
    const device = devices.find(d => d.name === estimate.deviceName);
    if (!device) return;

    // state に反映
    state.selectedDevice = device;
    state.contractType = estimate.contractType;
    state.discount.type = estimate.contractType;
    state.discountApplied = estimate.discountApplied;
    state.devicePrice = estimate.devicePrice;
    state.total = estimate.total;

    state.installments_num = estimate.installmentsNum;
    state.normal.price = estimate.normalPrice;
    state.normal.monthlyPrice = estimate.normalMonthlyPrice;

    state.kaedoki.price = estimate.kaedokiPrice;
    state.kaedoki.monthlyPrice = estimate.kaedokiMonthlyPrice;

    const deviceSelect = document.getElementById('device-select');
    if(deviceSelect){
      deviceSelect.value = device.name;
    }
    const contractSelect = document.getElementById('contract-select');
    if(contractSelect){
      contractSelect.value = estimate.contractType;
      contractSelect.hidden = false;
    }

    // 割引チェックボックス復元
    const discountCheckbox = document.getElementById('discount-checkbox');
    if(discountCheckbox){
      discountCheckbox.checked = !!estimate.discountApplied;
      // 割引コンテナの表示切替
      const discountContainer = document.getElementById('discount-container');
      discountContainer.style.visibility = estimate.discountApplied ? 'visible' : 'hidden';
    }

    // 価格プログラムチェックボックス復元
    const kaedokiCheckbox = document.getElementById('kaedoki-price-checkbox');
    const normalCheckbox = document.getElementById('normal-price-checkbox');
    state.normal.enabled = estimate.normalCheckbox;
    state.kaedoki.enabled = estimate.kaedokiCheckbox;

    if(normalCheckbox) normalCheckbox.checked = state.normal.enabled;
    if(kaedokiCheckbox) kaedokiCheckbox.checked = state.kaedoki.enabled;

    state.total = estimate.total;

    const customerName = document.getElementById('customer-name');
    customerName.textContent = estimate.customerName;

    console.log('読み込んだtotal:', estimate.total); // ここが 0 なら storage 側の問題
    updateTotalDisplay(state.total);
    updatePriceDisplay(state);
  } catch (e) {
    console.error('見積もりの読み込みエラー:', e);
  }
}
