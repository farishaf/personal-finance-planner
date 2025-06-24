export function convertRupiah(value: number) {
  if (value === undefined || value === null) {
    return null;
  }
  if (value !== null) {
    const values = String(value);
    const getNumberInBack = values.match(/\.(\d+)/g);
    const getNumberInFront = values.replace(/\.(\d+)/g);
    const datas = getNumberInBack
      ? getNumberInBack[0].slice(1, getNumberInBack[0].length)
      : null;
    const numbers = parseInt(getNumberInFront);
    // const removeBack = value.match(/\.(\d+)/g);
    const format = numbers.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const valueBack = getNumberInBack ? `,${datas}` : '';
    const rupiah = `Rp ${convert.join(',').split('').reverse().join('')}${valueBack.slice(0, 3)}.00`;
    return rupiah;
  }
}