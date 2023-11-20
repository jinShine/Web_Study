import express from 'express';
import cors from 'cors';

const port = 3000;

const app = express();

interface Food {
  id: string,
  name: string,
  price: number,
}

interface Order {
  id: string,
  menu: Food[],
  totalPrice: number,
}

const state: { orders: Order[] } = {
  orders: [],
};

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/orders/:id', (req, res) => {
  const { id } = req.params;

  const { orders } = state;
  const order = orders.find((i) => i.id === id);

  if (!order) {
    res.status(404)
      .send({});
    return;
  }

  res.status(200)
    .send({ order });
});

app.post('/orders', (req, res) => {
  const {
    menu,
    totalPrice,
  } = req.body;

  const order = {
    id: Date.now()
      .toString(),
    menu,
    totalPrice,
  };

  state.orders = [
    ...state.orders,
    order,
  ];

  res.status(201)
    .send({ id: order.id });
});

app.get('/restaurants', (req, res) => {
  const restaurants = [
    {
      id: '1',
      category: '중식',
      name: '메가반점',
      menu: [
        {
          id: '1',
          name: '짜장면',
          price: 8000,
        },
        {
          id: '2',
          name: '짬뽕',
          price: 8000,
        },
        {
          id: '3',
          name: '탕수육',
          price: 14000,
        },
      ],
    },
    {
      id: '2',
      category: '한식',
      name: '메리김밥',
      menu: [
        {
          id: '4',
          name: '김밥',
          price: 3500,
        },
        {
          id: '5',
          name: '제육김밥',
          price: 5500,
        },
        {
          id: '6',
          name: '컵라면',
          price: 2000,
        },
      ],
    },
    {
      id: '3',
      category: '한식',
      name: '데브부엌',
      menu: [
        {
          id: '7',
          name: '제육덮밥',
          price: 10000,
        },
        {
          id: '8',
          name: '갈비탕',
          price: 11000,
        },
        {
          id: '9',
          name: '돈까스',
          price: 1000,
        },
      ],
    },
    {
      id: '4',
      category: '일식',
      name: '로드스시',
      menu: [
        {
          id: '10',
          name: '기본초밥',
          price: 14000,
        },
        {
          id: '11',
          name: '디저트',
          price: 10000,
        },
        {
          id: '12',
          name: '연어',
          price: 21000,
        },
      ],
    },
    {
      id: '5',
      category: '일식',
      name: '혹등고래카레',
      menu: [
        {
          id: '13',
          name: '기본카레',
          price: 9000,
        },
        {
          id: '14',
          name: '밥추가',
          price: 13000,
        },
        {
          id: '15',
          name: '카레우동',
          price: 14000,
        },
      ],
    },
    {
      id: '6',
      category: '한식',
      name: '메가김치찌개',
      menu: [
        {
          id: '16',
          name: '김치찌개 1인',
          price: 8000,
        },
        {
          id: '17',
          name: '비빔밥',
          price: 8000,
        },
        {
          id: '18',
          name: '김치',
          price: 6000,
        },
      ],
    },
  ];

  res.send({ restaurants });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`);
});
