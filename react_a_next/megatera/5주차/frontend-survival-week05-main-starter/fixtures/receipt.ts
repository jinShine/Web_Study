import foods from './foods';

const receipt = {
  id: 'RECEIPT_ID',
  menu: foods,
  totalPrice: foods.reduce((acc, cur) => acc + cur.price, 0),
};

export default receipt;
