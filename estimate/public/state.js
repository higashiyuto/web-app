let observers = [];

//オブザーバ(監視関数)を登録するための関数
export function addObserver(fn){
    observers.push(fn); //配列にpushでfnを追加
}

//登録された全ての関数を一括実行する
function notify(){
    observers.forEach(fn => fn());
}

export const rawState = {
    selectedDevice: null,
    contractType: null,
    devicePrice: 0,
    installments_num: 1,
    discount: {
        enabled: false, //チェックボックスのon/off
        type: null,     //'MNP' | '新規' | '機種変更'
        selectedPrice: 0,
        amount: {
            mnp: 0,
            new: 0,
            change: 0,
        },       //'割引額'
    },
    kaedoki:{
        enabled: false,
        price: 0,
        monthlyPrice: 0,
    },
    normal:{
        enabled: false,
        price: 0,
        monthlyPrice: 0,
    },

    total: 0,
}

function observeState(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
        target[prop] = value;
        
        if(prop != 'total'){
            notify();
        }
        return true;
    },

    get(target, prop) {
      const value = target[prop];
      // ネストされたオブジェクトも監視対象に
      if (typeof value === 'object' && value !== null) {
        return observeState(value);
      }
      return value;
    }
  });
}

export { notify };
export const state = observeState(rawState);