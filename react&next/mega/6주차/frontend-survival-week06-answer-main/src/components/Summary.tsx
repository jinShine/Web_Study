import Food from '../types/Food';

import calculateTotalPrice from '../utils/calculateTotalPrice';

type SummaryProps = {
  selectedMenu: Food[];
}

export default function Summary({ selectedMenu }: SummaryProps) {
  const totalPrice = calculateTotalPrice(selectedMenu);

  const count = selectedMenu.length;

  return (
    <div>
      <h2>
        <span>
          주문내역
        </span>
        <span>
          {count}
          개
        </span>
      </h2>
      <div>
        총 결제 예상금액
        {' '}
        <strong>
          {totalPrice.toLocaleString()}
        </strong>
        원
      </div>
    </div>
  );
}
