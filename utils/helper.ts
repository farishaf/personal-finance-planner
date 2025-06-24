export function convertRupiah(value: number): string | null {
  if (value === undefined || value === null) return null;

  const values = String(value);
  const getNumberInBack = values.match(/\.(\d+)/g);
  const getNumberInFront = values.replace(/\.(\d+)/g, '');
  const datas = getNumberInBack
    ? getNumberInBack[0].slice(1)
    : null;

  const numbers = parseInt(getNumberInFront);
  const format = numbers.toString().split('').reverse().join('');
  const convert = format.match(/\d{1,3}/g) || [];
  const valueBack = getNumberInBack ? `,${datas}` : '';
  const rupiah = `Rp ${convert.join(',').split('').reverse().join('')}${valueBack.slice(0, 3)}.00`;

  return rupiah;
}