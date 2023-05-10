# Super Traders

A simple Buy and Sell Shares Game

## Main Features

- Buy and Sell Shares
  - Buying shares with valid portfolios
  - Selling shares with valid portfolio and sufficient balance
- User Module (Read and Create Users)
  - A user can have multiple portfolios
- Portfolio Module (Read and Create Portfolios)
  - A porfolio keeps shares
- Share Module (Read and Create Shares)
  - Also a user can update share price on an hour basis
- Logs (Application keeps all Buy and Sell operations)

## Installation

Run locally eva-case-study

```bash
  npm install
  npx prisma generate
  npx prisma migrate dev
  npx prisma db push
  npm run start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

## API Reference

#### Get all items

```http
  BUY /api/v1/trade/buy
```

| Parameter     | Type     | Description                                 |
| :------------ | :------- | :------------------------------------------ |
| `symbol`      | `string` | **Required**. Share symbol                  |
| `quantity`    | `number` | **Required**. Number of shares you will buy |
| `portfolioId` | `number` | **Required**. Related Portfolio             |

#### Get item

```http
  SELL /api/v1/trade/sell
```

| Parameter     | Type     | Description                                 |
| :------------ | :------- | :------------------------------------------ |
| `symbol`      | `string` | **Required**. Share symbol                  |
| `quantity`    | `number` | **Required**. Number of shares you will buy |
| `portfolioId` | `number` | **Required**. Related Portfolio             |

#### Other Endpoint

You can find other endpoint in `Postman Collection` file under `docs` folder.
