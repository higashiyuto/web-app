import { fetchDevices } from './api.js';
import { DeviceSelect, InstallmentsSelect, ContractTypeSelect} from './ui/select.js';
import { DeviceCheckbox } from './ui/checkbox.js';
import { SaveButton, LoadButton, ResetButton, PlanTabButton, setupTotalContainer } from './ui/button.js';
import { addObserver } from './state.js';
import { calculateTotal } from './logic/calculateTotal.js';
import { loadEstimateFromLocalStorage } from './load.js';

//一番最初に実行されるメソッド
async function init() {
  try {
    const devices = await fetchDevices(); //端末一覧を取得
    addObserver(calculateTotal);
    DeviceSelect(devices);
    ContractTypeSelect();
    InstallmentsSelect();
    DeviceCheckbox();
    SaveButton();
    LoadButton();
    ResetButton();
    PlanTabButton();
    setupTotalContainer();
    await loadEstimateFromLocalStorage();
  }catch(error){
    console.log('初期化エラー:', error);
  }
}

init();
