# API Endpoints Summary

## Authentication

| Endpoint                            | Method | Description          | Body                                                 |
|-------------------------------------|--------|----------------------|------------------------------------------------------|
| `/auth/register`                    | POST   | Register user        | `{firstName, lastName, email, userName, password, confirmPassword, phone, address, street, zipCode }  `      |
| `/auth/login`                       | POST   | Login รับ JWT         | `{ "identify": "userName or email", "password": "1234" }`         |
| `/auth/logout`                      | POST   | Logout               | None                                                 |
| `/auth/forgot-password`             | POST   | ขอ Reset Password    | None                                                 | optional
| `/auth/reset-password`              | POST   | Reset Password       | None                                                 | optional

## User API

| Endpoint                            | Method | Description             | Body                        |
|-------------------------------------|--------|-------------------------|-----------------------------|
| `/user/me`                         | GET    | Get profile             | None                        |
| `/user/me`                         | PUT    | Update profile          | None                        |
| `/user/book`                             | GET    | Get all books, category | None                        |
| `/user/book/:id`                         | GET    | Get book detail         | None                        |
| `/user/cart`                             | GET    | Get book in Cart        | None                        |
| `/user/cart`                             | PUT    | PUT book in Cart        | None                        |
| `/user/cart`                             | POST   | Add book in Cart        | None                        |
| `/user/cart/`                            | DELETE | Remove book in Cart     | None                        |
| `/user/checkout`                    | POST   | Checkout                | None                        |
| `/user/orders`                           | GET    | List of orders          | None                        |
| `/user/orders/:orderId`                  | GET    | Rental detail           | None                        |
| `/user/orders/:orderId/status`           | GET    | Book Status             | None                        |
| `/user/orders/:orderId/return`           | POST   | Return Book             | Tracking number                        |


## Admin API

| Endpoint                            | Method | Description               | Body                              |
|-------------------------------------|--------|---------------------------|-----------------------------------|
| `/admin/users`                      | GET    | Get all users             | None                              |
| `/admin/users/:userId`              | GET    | Get user                  | None                              |
| `/admin/books`                      | POST   | Add new book              | None                              |
| `/admin/books/:bookId`              | PUT    | Update book               | None                              |
| `/admin/books/:bookId`              | DELETE | Delete book               | None                              |
| `/admin/promotions`                 | GET    | List promotion            | None                              | optional
| `/admin/promotions`                 | POST   | Add Promotion             | None                              | optional
| `/admin/promotions/:promotionId`    | PUT    | Update Promotion          | None                              | optional
| `/admin/promotions/:promotionId`    | DELETE | Delete Promotion          | None                              | optional
| `/admin/change-status`              | POST   | Change user status        | `{ "id": 1, "enabled": false }`                            |
| `/admin/change-role`                | POST   | Change user role          | `{ "id": 1, "role": "user" }`                              |


## Category

| Endpoint                      | Method | Description             | Body                        |
|-------------------------------|--------|-------------------------|-----------------------------|
| `/category`                   | GET    | Get categories          | None                        |
| `/category`                   | POST   | Create category         | `{ "name": "Test1" }`       |
| `/category/:id`               | PUT    | Update category         | `{ "name": "Test1" }`       |
| `/category/:id`               | DELETE | Delete category by ID   | None                        |


## Book API

| Endpoint                            | Method | Description               | Body                              |
|-------------------------------------|--------|---------------------------|-----------------------------------|
| `/book/`                            | POST   | Get all users             | None                              |
| `/book/list/`                       | GET    | Get user                  | None                              |
| `/book/:id`                         | PUT    | Get user                  | None                              |
| `/book/:id/`                        | GET    | Get user                  | None                              |
| `/book/product-by`                  | POST   | Get user                  | None                              |
| `/book/search/filters`              | POST   | Get user                  | None                              |

## Using

| asd                | asd                |
|--------------------|--------------------|
| Frontend:          | React + TailwindCSS + DaisyUI |
| State Management:  | Zustand  |
| Backend:           | Node.js + Express + Prisma |
| Database:          | MySQL |
| Auth:              | JWT + Refresh Token + Email Verification |
| Deployment:        | Railway / Render / Vercel |

## Package

```
JWT Authentication 
Rate Limiting
CORS
```