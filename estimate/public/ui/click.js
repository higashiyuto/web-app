import { deleteEstimateByCustomerName } from './api.js';

export function addContentMenuToListItem(li, customerName){
    li.addEventListener('contextmenu', async (event) => {
        event.preventDefault();

        if(confirm(`「${customerName}」の見積もりを削除しますか？`)){
            try {
                await deleteEstimateByCustomerName(customerName);
                li.remove();
                alert('削除しました');
            } catch (error) {
                alert('削除に失敗しました');
                console.error(error);
            }
        }
    });
}
