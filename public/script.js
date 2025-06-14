let deviceList = [];
const formElements = {
  price: document.getElementById('priceInput'),
  kaedoki: document.getElementById('kaedokiInput'),
  warranty: document.getElementById('warrantyInput'),
  mnpDiscount: document.getElementById('mnpDiscountInput'),
  newDiscount: document.getElementById('newDiscountInput'),
  changeDiscount: document.getElementById('changeDiscountInput')
};

async function loadDevices() {
  //devicesルートにGETリクエストを送り、それの返答結果をresに保存
  const res = await fetch('http://localhost:3000/api/devices');

  //受け取ったデータは通信の関係上文字列になってるので、json形式に直す必要がある
  deviceList = await res.json();

  //端末リストを追加
  const select = document.getElementById('deviceSelect');
  deviceList.forEach(device => {
    const option = document.createElement('option');
    option.value = device.name;
    option.textContent = device.name;
    select.appendChild(option);
  });
}

// デバイス選択時にフォームに値を反映
function setupDeviceSelectHandler() {
  const select = document.getElementById('deviceSelect');
  const newDeviceInput = document.getElementById('deviceNameInput');
  const editBtn = document.getElementById('edit');

  select.addEventListener('change', () => {
    const selectedName = select.value;

    if (selectedName === 'new') {
        select.style.display = 'none';
        newDeviceInput.style.display = 'inline-block';
        newDeviceInput.focus();
        Object.values(formElements).forEach(input => input.value = '');
    } else {
      // 既存端末 → データを反映
      newDeviceInput.style.display = 'none';
      select.style.display = 'inline-block';
      const selectedDevice = deviceList.find(device => device.name === selectedName);
      if (selectedDevice) {
        formElements.price.value = selectedDevice.price;
        formElements.kaedoki.value = selectedDevice.kaedoki;
        formElements.warranty.value = selectedDevice.warranty;
        formElements.mnpDiscount.value = selectedDevice.discount.mnp;
        formElements.newDiscount.value = selectedDevice.discount.new;
        formElements.changeDiscount.value = selectedDevice.discount.change;
      }
    }
  });

  editBtn.addEventListener('click', () => {
    newDeviceInput.style.display = 'none';
    select.style.display = 'inline-block';

    // 2. 入力欄をリセット
    Object.values(formElements).forEach(input => input.value = '');

    // 3. セレクトボックスを初期状態に戻す
    select.value = ""; // disabled selected の空白オプションに戻す
  });
}

document.getElementById('deviceForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // device名はselectかinputどちらかから取得
  const deviceName = document.getElementById('deviceSelect').style.display !== 'none'
    ? document.getElementById('deviceSelect').value
    : document.getElementById('deviceNameInput').value;

  const payload = {
    name: deviceName,
    price: Number(formElements.price.value),
    kaedoki: Number(formElements.kaedoki.value),
    warranty: Number(formElements.warranty.value),
    discount: {
      mnp: Number(formElements.mnpDiscount.value),
      new: Number(formElements.newDiscount.value),
      change: Number(formElements.changeDiscount.value),
    }
  };

  try {
    const res = await fetch('http://localhost:3000/api/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('サーバーエラー');

    alert('保存しました');
    window.location.reload(); // 保存後リロードして一覧更新
  } catch (err) {
    console.error('保存エラー:', err);
    alert('保存に失敗しました');
  }
});

loadDevices().then(setupDeviceSelectHandler);