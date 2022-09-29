export default function formatCurrnecy(num){
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";

}