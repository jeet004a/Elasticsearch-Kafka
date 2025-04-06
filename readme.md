# E-Commerce Project

This project is an e-commerce platform that includes all the API functionalities for the **User Service**, **Cart Service**, and **Order Service**.

---

## User Service API Endpoints

### 1. **User Registration**
- **Endpoint**: `POST /register`
- **Description**: Registers a new user.
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **201 Created**:
        ```json
        {
            "message": "User created",
            "user": {
                "id": "number",
                "username": "string",
                "email": "string"
            }
        }
        ```
    - **400 Bad Request**:
        ```json
        {
            "message": "User already exists"
        }
        ```

### 2. **User Login**
- **Endpoint**: `POST /login`
- **Description**: Authenticates a user and returns a token.
- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Login successful",
            "token": "string"
        }
        ```
    - **404 Not Found**:
        ```json
        {
            "message": "User not found"
        }
        ```
    - **400 Bad Request**:
        ```json
        {
            "message": "Invalid password"
        }
        ```

### 3. **Token Validation**
- **Endpoint**: `GET /validate`
- **Description**: Validates the JWT token.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "user": {
                "id": "number",
                "email": "string"
            }
        }
        ```
    - **401 Unauthorized**:
        ```json
        {
            "message": "Unauthorized"
        }
        ```
    - **403 Forbidden**:
        ```json
        {
            "message": "Invalid token"
        }
        ```

---

## Cart Service API Endpoints

### 1. **Add to Cart**
- **Endpoint**: `POST /cart`
- **Description**: Adds an item to the user's cart.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Request Body**:
    ```json
    {
        "productId": "number",
        "quantity": "number"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "cartId": "number",
            "customerId": "number",
            "items": [
                {
                    "productId": "number",
                    "quantity": "number"
                }
            ]
        }
        ```
    - **400 Bad Request**:
        ```json
        {
            "error": "Validation error"
        }
        ```

### 2. **Get Cart**
- **Endpoint**: `GET /cart`
- **Description**: Fetches the user's cart.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "cartId": "number",
            "customerId": "number",
            "items": [
                {
                    "productId": "number",
                    "quantity": "number"
                }
            ]
        }
        ```

### 3. **Update Cart Item**
- **Endpoint**: `PATCH /cart/:id`
- **Description**: Updates the quantity of an item in the cart.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Request Body**:
    ```json
    {
        "qty": "number"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Cart updated successfully"
        }
        ```

### 4. **Delete Cart Item**
- **Endpoint**: `DELETE /cart/:id`
- **Description**: Deletes an item from the cart.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Cart item deleted successfully"
        }
        ```

---

## Order Service API Endpoints

### 1. **Create Order**
- **Endpoint**: `POST /order`
- **Description**: Creates an order from the user's cart.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "orderId": "number",
            "customerId": "number",
            "items": [
                {
                    "productId": "number",
                    "quantity": "number"
                }
            ],
            "status": "string"
        }
        ```

### 2. **Get All Orders**
- **Endpoint**: `GET /orders`
- **Description**: Fetches all orders for the logged-in user.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        [
            {
                "orderId": "number",
                "status": "string",
                "items": [
                    {
                        "productId": "number",
                        "quantity": "number"
                    }
                ]
            }
        ]
        ```

### 3. **Get Order by ID**
- **Endpoint**: `GET /order/:id`
- **Description**: Fetches a specific order by its ID.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "orderId": "number",
            "status": "string",
            "items": [
                {
                    "productId": "number",
                    "quantity": "number"
                }
            ]
        }
        ```

### 4. **Update Order Status**
- **Endpoint**: `PATCH /order/:id`
- **Description**: Updates the status of an order.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Request Body**:
    ```json
    {
        "status": "string"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Order status updated successfully"
        }
        ```

### 5. **Delete Order**
- **Endpoint**: `DELETE /order/:id`
- **Description**: Deletes an order.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Order deleted successfully"
        }
        ```

### 6. **Checkout Order**
- **Endpoint**: `GET /orders/:id/checkout`
- **Description**: Checks out an order.
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Order checked out successfully"
        }
        ```

---

## Catalog Service API Endpoints

### 1. **Create Product**
- **Endpoint**: `POST /product`
- **Description**: Creates a new product in the catalog.
- **Request Body**:
    ```json
    {
        "name": "string",
        "description": "string",
        "price": "number",
        "stock": "number"
    }
    ```
- **Response**:
    - **201 Created**:
        ```json
        {
            "id": "number",
            "name": "string",
            "description": "string",
            "price": "number",
            "stock": "number"
        }
        ```
    - **400 Bad Request**:
        ```json
        {
            "errors": "Validation errors"
        }
        ```
    - **500 Internal Server Error**:
        ```json
        {
            "message": "Error message"
        }
        ```

### 2. **Update Product**
- **Endpoint**: `PATCH /product/:id`
- **Description**: Updates an existing product in the catalog.
- **Request Parameters**:
    - `id`: The ID of the product to update.
- **Request Body**:
    ```json
    {
        "name": "string",
        "description": "string",
        "price": "number",
        "stock": "number"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "id": "number",
            "name": "string",
            "description": "string",
            "price": "number",
            "stock": "number"
        }
        ```
    - **400 Bad Request**:
        ```json
        {
            "errors": "Validation errors"
        }
        ```
    - **500 Internal Server Error**:
        ```json
        {
            "message": "Error message"
        }
        ```

### 3. **Get All Products**
- **Endpoint**: `GET /products`
- **Description**: Fetches all products in the catalog.
- **Query Parameters**:
    - `limit` (optional): Number of products to fetch.
    - `offset` (optional): Number of products to skip.
- **Response**:
    - **200 OK**:
        ```json
        [
            {
                "id": "number",
                "name": "string",
                "description": "string",
                "price": "number",
                "stock": "number"
            }
        ]
        ```
    - **500 Internal Server Error**:
        ```json
        {
            "message": "Error message"
        }
        ```

### 4. **Get Product by ID**
- **Endpoint**: `GET /product/:id`
- **Description**: Fetches a specific product by its ID.
- **Request Parameters**:
    - `id`: The ID of the product to fetch.
- **Response**:
    - **200 OK**:
        ```json
        {
            "id": "number",
            "name": "string",
            "description": "string",
            "price": "number",
            "stock": "number"
        }
        ```
    - **500 Internal Server Error**:
        ```json
        {
            "message": "Error message"
        }
        ```

### 5. **Delete Product**
- **Endpoint**: `DELETE /product/:id`
- **Description**: Deletes a product from the catalog.
- **Request Parameters**:
    - `id`: The ID of the product to delete.
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Product deleted successfully"
        }
        ```
    - **500 Internal Server Error**:
        ```json
        {
            "message": "Error message"
        }
        ```

### 6. **Get Product Stock**
- **Endpoint**: `POST /product/stock`
- **Description**: Fetches the stock information for a list of product IDs.
- **Request Body**:
    ```json
    {
        "ids": ["number"]
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        [
            {
                "id": "number",
                "stock": "number"
            }
        ]
        ```
    - **500 Internal Server Error**:
        ```json
            {
                "message": "Error message"
            }
            ```
            

## Kafka Integration

Kafka is used in this e-commerce application to enable efficient communication between microservices. It acts as a distributed messaging system, ensuring reliable and asynchronous communication. Key benefits of using Kafka in this project include:
- **Event-Driven Architecture**: Kafka allows services to publish and subscribe to events, enabling real-time updates and decoupling of services.
- **Scalability**: Kafka's distributed nature ensures that the system can handle high volumes of data and scale as the application grows.
- **Fault Tolerance**: Kafka ensures message durability and fault tolerance, making the system more resilient to failures.
- **Data Streaming**: Kafka enables real-time data streaming for use cases like order tracking, inventory updates, and analytics.

### Catalog Product Management with Kafka

Kafka plays a crucial role in managing product inventory in the catalog service:
- **Order Placement**: When a user places an order, the Order Service publishes an event to Kafka. The Catalog Service subscribes to this event and deducts the ordered quantity from the product stock.
- **Payment Success**: If the payment is successful, no further action is needed as the stock is already updated.
- **Order Cancellation**: If the user cancels the order, the Order Service publishes a cancellation event to Kafka. The Catalog Service listens to this event and reverts the deducted quantity, ensuring accurate stock levels.

By leveraging Kafka for these workflows, the system ensures consistency and real-time updates across services, even in complex scenarios like order cancellations.

## Microservices Architecture

This project is built on a microservices architecture, which provides the following advantages:
- **Decoupled Services**: Each service (User, Cart, Order, Catalog) operates independently, making the system more modular and easier to maintain.
- **Scalability**: Individual services can be scaled independently based on their specific load requirements.
- **Technology Agnostic**: Each service can use different technologies or programming languages, allowing flexibility in development.
- **Fault Isolation**: Failures in one service do not affect the entire system, improving overall reliability.
- **Faster Development**: Teams can work on different services simultaneously, speeding up the development process.

The microservices architecture helps this project grow by enabling faster feature development, improving system reliability, and allowing the platform to scale efficiently as user demands increase.

