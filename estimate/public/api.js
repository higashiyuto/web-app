const API_BASE = 'http://localhost:3000/api';

//デバイス一覧を /api/devicesエンドポイントから取得する
//Deviceデータベースに登録されているすべての端末情報を返す
export async function fetchDevices(){
    const res = await fetch(`${API_BASE}/devices`);
    if(!res.ok) throw new Error('Failed to fetch devices');
    return await res.json();
}

export async function saveEstimate(estimate){
    try{
        const response = await fetch(`${API_BASE}/estimates`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estimate)
        });

        if(!response.ok){
            throw new Error('保存に失敗しました');
        }

        const data = await response.json();
        alert('見積もりを保存しました');
    }catch(error){
        console.error('saveEstimate error:', error);
        alert('保存中にエラーが発生しました');
    }
}

export async function fetchCustomerNames(){
    const res = await fetch(`${API_BASE}/estimates/customers`);
    if(!res.ok) throw new Error('顧客一覧の取得に失敗しました');
    return await res.json();
}

export async function fetchEstimateByCustomerName(name) {
  const res = await fetch(`${API_BASE}/estimates/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error('見積もりの取得に失敗しました');
  return await res.json();
}

export async function deleteEstimateByCustomerName(name){
    try{
        const res = await fetch(`${API_BASE}/estimates/${encodeURIComponent(name)}`,{
            method: 'DELETE',
        });
        if(!res.ok) throw new Error('見積もりの削除に失敗しました');
        return await res.json();
    }catch(error){
        console.error('deleteEstimateByCustomerName error', error);
        throw error;
    }
}