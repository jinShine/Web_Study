import foods from './foods';

const order = {
  id: 'RECEIPT_ID',
  menu: foods,
  totalPrice: foods.reduce((acc, cur) => acc + cur.price, 0),
};

export default order;
