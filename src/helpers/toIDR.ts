export const toIDR = (num: number) => {
    const rupiah = Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    })
    const convertedText = rupiah.format(num);
    return convertedText;
}