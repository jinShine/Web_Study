import { useSearchParams } from 'react-router-dom';

import { useNavigate } from 'react-router';

import Order from '../components/order';

export default function OrderCompletePage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    navigate('/');
    return null;
  }

  const handleClickBack = () => {
    navigate('/');
  };

  return (
    <Order
      orderId={orderId}
      onClickBack={handleClickBack}
    />
  );
}
