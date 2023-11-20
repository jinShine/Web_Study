import Food from '../../types/Food';

import calculateTotalPrice from '../../utils/calculateTotalPrice';

type SummaryProps = {
  selectedMenu: Food[];
}

export default function Summary({ selectedMenu }: SummaryProps) {
  const totalPrice = calculateTotalPrice(selectedMenu);

  const count = selectedMenu.length;

  return (
    <>
      <div>
        <span>
          주문내역
          {' '}
          {count}
          개
        </span>
      </div>
      <div>
        총 결제 예상금액
        {' '}
        {totalPrice.toLocaleString()}
        원
      </div>
    </>
  );
}
