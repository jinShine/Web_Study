import { rest } from "msw";
// import fixtures from '../../fixtures';

const BASE_URL = "http://localhost:3000";

const handlers = [
  rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
    // const { products } = fixtures; // fixtures를 사용해도 됨
    const products = [
      {
        category: "Fruits",
        price: "$1",
        stocked: true,
        name: "Apple",
      },
    ];

    return res(
      ctx.status(200), // 없어도 됨(기본 설정이 200)
      ctx.json({ products }) // 위의 요청을 이 형태로 반황
    );
  }),
];

export default handlers;
