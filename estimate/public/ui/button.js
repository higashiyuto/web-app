import { state } from '../state.js';
import { saveEstimate } from '../api.js';

export function SaveButton(){
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', async()=>{
        const customerName = prompt('カスタマー名を入力してください');

        if(!customerName || customerName.trim() === ''){
            alert('カスタマー名が未入力です');
            return;
        }

        const estimate = createEstimateFromState(state, customerName.trim());
        await saveEstimate(estimate);
    });
}

export function LoadButton(){
    const loadButton = document.getElementById('open-button');
    loadButton.addEventListener('click', () => {
        window.open('customers.html', '_blank');
    });
}

export function ResetButton(){
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', ()=>{
       window.location.reload(); 
    });
}

export function PlanTabButton(){
    document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      // タブボタン切り替え
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // コンテンツ切り替え
      const tabId = button.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function createEstimateFromState(state, customerName) {
  const estimate = {
    customerName: customerName,
    deviceName:          state.selectedDevice ? state.selectedDevice.name : '',
    devicePrice:         state.devicePrice,
    kaedokiPrice:        state.kaedoki.price,
    kaedokiMonthlyPrice: state.kaedoki.monthlyPrice,
    kaedokiCheckbox:     state.kaedoki.enabled,
    normalPrice:         state.normal.price,
    normalMonthlyPrice:  state.normal.monthlyPrice,
    normalCheckbox:      state.normal.enabled,
    contractType:        state.contractType,
    discountApplied:     document.getElementById('discount-checkbox')?.checked || false,
    installmentsNum:     state.installments_num, // 通常分割のときのみセット
    total: state.total,
  };

  return estimate;
}

export function setupTotalContainer() {
  const totalContainer = document.getElementById('total-container');
  if (!totalContainer) return;

  // 例としてmain-plan-buttonとsub-plan-buttonsのボタンを監視
  const buttons = document.querySelectorAll('.main-plan-button, .sub-plan-buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // ボタンのdata-price属性から価格を取得（なければ0）
      const price = Number(button.dataset.price) || 0;

      // 現状の合計からpriceを加算 or 置き換えするロジック（例は置き換え）
      // ※累積計算するなら別途変数管理が必要

      // 合計表示を更新
      totalContainer.textContent = `合計 ${price.toLocaleString()}円`;
    });
  });

  // チェックボックスもあれば監視して更新できるように
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // チェックボックスごとに価格などを取得して合計計算したい場合はここにロジックを
      // とりあえず例としてチェックされていれば＋1000円、外せば0円

      let addPrice = 0;
      if (checkbox.checked) addPrice = 1000;

      totalContainer.textContent = `合計 ${addPrice.toLocaleString()}円`;
    });
  });
}





