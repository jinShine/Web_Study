import _ from 'lodash';

import MenuItem from './MenuItem';

import Receipt from '../types/Receipt';

type ReceiptPrinterProps = {
  receipt: Receipt;
}

export default function ReceiptPrinter({ receipt }: ReceiptPrinterProps) {
  if (_.isEmpty(receipt)) {
    return <p>[영수증 나오는 곳]</p>;
  }

  const { id, menu, totalPrice } = receipt;

  return (
    <div style={{
      width: '50%',
      border: '1px solid black',
      textAlign: 'center',
    }}
    >
      <h2>영수증</h2>
      <div>
        <h3>주문번호</h3>
        <p>{id}</p>
      </div>
      <div>
        <h3>주문목록</h3>
        <ul style={{
          padding: 0,
          listStyle: 'none',
        }}
        >
          {menu.map((food, index) => {
            const key = `${food.id}-${index}`;

            return (
              <MenuItem
                key={key}
                food={food}
              />
            );
          })}
        </ul>
      </div>
      <p>
        총 가격:
        {' '}
        {totalPrice.toLocaleString()}
        원
      </p>
    </div>
  );
}
