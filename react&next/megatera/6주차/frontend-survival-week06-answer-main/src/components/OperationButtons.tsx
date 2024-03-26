type OperationButtonsProps = {
  onClickCancel: () => void;
  onClickOrder: () => void;
}

export default function OperationButtons({
  onClickCancel, onClickOrder,
}: OperationButtonsProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onClickCancel}
      >
        취소
      </button>
      <button
        type="button"
        onClick={onClickOrder}
      >
        주문하기
      </button>
    </div>
  );
}
