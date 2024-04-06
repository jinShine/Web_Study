import { rest } from "msw";

const handlers = [
  rest.get("http://localhost:3000/products", (req, res, ctx) => {
    const products = [
      {
        category: "Fruits",
        price: "$1",
        stocked: true,
        name: "Apple",
      },
    ];

    return res(ctx.status(200), ctx.json(products));
  }),
];

export default handlers;
