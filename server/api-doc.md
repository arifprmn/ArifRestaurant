# Arif Restaurant

CMS Integration - Server

# Arif Restaurant API Documentation

## Endpoints :

List of available endpoints:

- `POST /register'

- `POST /login`

- `POST /login-google`

- `GET /verif/:verificationCode`

- `GET /food`

- `POST /midtranstoken/:foodId`

- `PATCH /midtrantoken/patch/:foodId`

- `GET /customerhistory`

&nbsp;

## 1. POST /register

Description:

- Register user to database

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "Open your email for verification account"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username cannot be empty"
}
OR
{
  "message": "username cannot be empty"
}
OR
{
  "message": "email cannot be empty"
}
OR
{
  "message": "wrong format email"
}
OR
{
  "message": "email has already been registered"
}
OR
{
  "message": "Password cannot be empty"
}
```

&nbsp;

## 2. POST /login

Description:

- Login user to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "name": "string",
  "access_token": "string",
  "message:'Customer login successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email or password"
}
OR
{
  "message": "Field cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 3. POST /login-google

Description:

- Register user to database using Google

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "User has been created",
  "data": {
    "email":,
    "password":,
   }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email has already been registered"
}
```

## 4. GET /food

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
        "foundFoods": {
            "count": 20,
            "rows": [
                {
                    "id": 1,
                    "name": "Butter, Salted",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                },
                {
                    "id": 2,
                    "name": "Butter, Whipped, With Salt",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/ec6/ec68f0d43ed9b399c8464481f89eb225.jpg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                },
                {
                    "id": 3,
                    "name": "Butter Oil, Anhydrous",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/2b5/2b504c036c64481b224c9d74cc4a82e0.jpg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                },
                {
                    "id": 4,
                    "name": "Cheese, Blue",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/b44/b442cfc174a1a691dca574c9b7dcb47a.jpg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            ]
        }
  ...,
]
```

## 5. GET /verif/:verificationCode

Description:

- Get verification code for verification

Request:

- params:

```json
{
  "verificationCode": "string"
}
```

_Response (200 - OK)_

```json
{
  "messsage": "Account has been verified"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Customer Not Found"
}
```

&nbsp;

## 5. POST /midtranstoken/:foodId

Description:

- Post a food for datebase

Request:

- headers:

```json
{
  "access_token": "string"
}
```

-params:

```json
{
  "foodId": "integer"
}
```

_Response (201 - OK)_

```json for acoount
[
   "data":{
    "midtransToken",
    "dataPayment"
   }
]
```

&nbsp;

## 6. PATCH /midtrantoken/parch/:foodId

Description:

- Update status payment to success

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "foodId": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Successfully for buy this food "
}
```

## 10. GET /customerhistory

Description:

- Get all payment history from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
     "data": {
        "foundHistory": [
            {
                "id": 1,
                "price": 10000,
                "CustomerId": 1,
                "status": "Success",
                "FoodId": 1,
                "createdAt": "2023-09-27T13:31:51.672Z",
                "updatedAt": "2023-09-27T13:33:59.786Z",
                "Food": {
                    "id": 1,
                    "name": "Butter, Salted",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            },
            {
                "id": 2,
                "price": 10000,
                "CustomerId": 1,
                "status": "Pending",
                "FoodId": 1,
                "createdAt": "2023-09-28T04:50:26.192Z",
                "updatedAt": "2023-09-28T04:50:26.192Z",
                "Food": {
                    "id": 1,
                    "name": "Butter, Salted",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            },
            {
                "id": 3,
                "price": 10000,
                "CustomerId": 1,
                "status": "Pending",
                "FoodId": 14,
                "createdAt": "2023-09-28T05:19:21.508Z",
                "updatedAt": "2023-09-28T05:19:21.508Z",
                "Food": {
                    "id": 14,
                    "name": "Cheese, Cottage, Nonfat, Uncreamed, Dry, Large or Small Curd",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/f28/f28c23a0ce83d037a5c27401e4ce41e9.jpg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            },
            {
                "id": 4,
                "price": 10000,
                "CustomerId": 1,
                "status": "Success",
                "FoodId": 1,
                "createdAt": "2023-09-28T06:14:54.253Z",
                "updatedAt": "2023-09-28T06:15:50.866Z",
                "Food": {
                    "id": 1,
                    "name": "Butter, Salted",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            },
            {
                "id": 5,
                "price": 10000,
                "CustomerId": 1,
                "status": "Success",
                "FoodId": 1,
                "createdAt": "2023-09-28T06:23:21.115Z",
                "updatedAt": "2023-09-28T06:23:48.347Z",
                "Food": {
                    "id": 1,
                    "name": "Butter, Salted",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            },
            {
                "id": 6,
                "price": 10000,
                "CustomerId": 1,
                "status": "Success",
                "FoodId": 2,
                "createdAt": "2023-09-28T08:58:43.275Z",
                "updatedAt": "2023-09-28T08:59:32.130Z",
                "Food": {
                    "id": 2,
                    "name": "Butter, Whipped, With Salt",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/ec6/ec68f0d43ed9b399c8464481f89eb225.jpg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            },
            {
                "id": 7,
                "price": 10000,
                "CustomerId": 1,
                "status": "Pending",
                "FoodId": 1,
                "createdAt": "2023-09-28T08:59:44.658Z",
                "updatedAt": "2023-09-28T08:59:44.658Z",
                "Food": {
                    "id": 1,
                    "name": "Butter, Salted",
                    "price": 10000,
                    "description": "enak",
                    "imageUrl": "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
                    "createdAt": "2023-09-27T13:25:44.709Z",
                    "updatedAt": "2023-09-27T13:25:44.709Z"
                }
            }
        ],
        "customer": "arifprmn",
        "qrCode": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAEy0lEQVR42u3dQY7bMBAAQTvI/7/sPEEBaHooddV916LhBg8jSu/P5/N5AY/2Z/oCgP2EDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgT8/cWHvN/v6XVudfUOjNX1n/6Ojd3rq/9+vsGODgFChwChQ4DQIUDoECB0CBA6BPxkjn6lPieedvc5+NO/32+wo0OA0CFA6BAgdAgQOgQIHQKEDgFHzNGv3H0Oe3X9q58/PQffvb5Vd//9fIMdHQKEDgFChwChQ4DQIUDoECB0CLjFHP3pds+hV+fkT5+zF9jRIUDoECB0CBA6BAgdAoQOAUKHAHP0G5g+T/3059oX2NEhQOgQIHQIEDoECB0ChA4BQoeAW8zR7z6H3X0e/Mrq/3/6919gR4cAoUOA0CFA6BAgdAgQOgQIHQKOmKPvPm89bfdz009/v/v0fQLY0SFB6BAgdAgQOgQIHQKEDgFCh4D3x2HdcafPqVev/4qf4H52dAgQOgQIHQKEDgFChwChQ4DQIeAn59GnzwtPPxd995x7+jz39Pe7e32r65++z+H1sqNDgtAhQOgQIHQIEDoECB0ChA4BR5xHv/ucfff67359u/9+1fR5fXN04CuEDgFChwChQ4DQIUDoECB0CDjiPPr0HHP39U+vf3V9q38/fd5+9/rvwI4OAUKHAKFDgNAhQOgQIHQIEDoE/GSOvvu88dX/n55zmwPvXd/0fQjT5+n/hx0dAoQOAUKHAKFDgNAhQOgQIHQI+Mkc/crpc+bp55I/fY4//f1emf78b7CjQ4DQIUDoECB0CBA6BAgdAoQOAUfM0Z8+R12dY58+p9095999H8Lp3+832NEhQOgQIHQIEDoECB0ChA4BQoeAI+boV6bn7LvnrNNz4tPn/Kvrm56TTz93/vWyo0OC0CFA6BAgdAgQOgQIHQKEDgE/maNPv9/6hDnmyvVNz4F338dw+nPrV03//l8vOzokCB0ChA4BQocAoUOA0CFA6BDwkzn66e/nfvr6p+fcq9e/W+E+Djs6BAgdAoQOAUKHAKFDgNAhQOgQ8P6cMOR7uN3Pbd/9+avX9/Q5/R0SsqNDgNAhQOgQIHQIEDoECB0ChA4BRzzX/e6u5qhPnxNPvz9+93Phd79/3XPdga8QOgQIHQKEDgFChwChQ4DQIeAnc/Qrp5/nPX1OfPp58FXT1zd9H8E32NEhQOgQIHQIEDoECB0ChA4BQoeAI+boV6bPW5/u7nPy0+fQu98//wt2dAgQOgQIHQKEDgFChwChQ4DQIeAWc/S7O/255NNz4OnPP/37+QY7OgQIHQKEDgFChwChQ4DQIUDoEGCOfgO73789PSffrfD+8yt2dAgQOgQIHQKEDgFChwChQ4DQIeAWc/QT5pBPXv/q/5+eQ69+/vT6f/H7tqNDgNAhQOgQIHQIEDoECB0ChA4BR8zR7/Bc7EnTc+BVd78P4Ans6BAgdAgQOgQIHQKEDgFChwChQ8D7Uz/sDQF2dAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BDwD7oLjRfdiVDXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA5LTI4VDEwOjAzOjQ1KzAwOjAw7MIizwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wOS0yOFQxMDowMzo0NSswMDowMJ2fmnMAAAAASUVORK5CYII="
    }
]
```
