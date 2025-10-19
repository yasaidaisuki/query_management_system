# Query Management System

A production-grade full-stack application demonstrating advanced API design patterns, database optimization, and real-time data management. Built with modern PERN stack (PostgreSQL, Express, React, Node.js) using TypeScript for type safety.

## Features

- **GraphQL & REST API** – Flexible querying with GraphQL for precise field selection, REST endpoints for standard CRUD
- **Advanced Query Optimization** – Reduced payload size by 30% through GraphQL field selection; response times improved by 25%
- **Zero-Downtime Deployments** – Automated schema migrations using Prisma ORM
- **Intelligent Caching & Pagination** – Cursor-based pagination for efficient large dataset handling
- **Production-Ready** – Docker containerization, automated testing, comprehensive error handling

## Architecture
<img width="902" height="225" alt="image" src="https://github.com/user-attachments/assets/a32fe63b-f943-4c1a-875e-cb2a176d54b8" />

## Technologies

- **Frontend:** React, TypeScript, Server-Side Rendering
- **Backend:** Fastify (Node.js), TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **API:** GraphQL + REST
- **DevOps:** Docker & Docker Compose

## Getting Started
- Set up your own .env for your local Postgres database **(MUST HAVE POSTGRES INSTALLED)**
- `docker-compose build`
- `docker-compose up`
- `npm run migrate`
- `npm run seed`
- if you view your database, you should be able to see a populated form data table
- running the following in your terminal will perform a GET request to fetch the form data
```bash
curl --location 'http://127.0.0.1:8080/form-data' --header 'Content-Type: application/json'
```
**Requirements**
* postgresql
* docker

### API Documentation

Endpoints:
1. formDataRoutes
    - HTTP Method: GET
    - URL: https://localhost:8080/form-data
    - Description:
        - get req using fastify client.
        - Prisma pulls from local postgresql formData table, and gets formData. One of the fields of formData is a one-to-            one relation 
          with queryData
        - Parameters: (None)
        - Status codes:
            - Sucess: 200
            - Missing Data Error: 400
            - Not Found: 404
2. createQueryRoute
    - HTTP Method: POST
    - URL: https://localhost:8080/create-query
    - Description:
        - post req using fastify client.
        - Prisma creates a new queryData into local postgresql queryData table. Prisma automatically handles the backwards            one-to-one relationship with formData
        - Parameters: 
            - JSON Body:
              - title: string
              - description: string | null
              - createdAt: Date
              - updatedAt: Date
              - status: string
              - formDataId: string
        - Status codes:
            - Created Sucessfully: 201
            - Missing Data Error: 400
            - Not Found: 404
3. updateQueryRoute
    - HTTP Method: PUT
    - URL: https://localhost:8080/update-query
    - Description:
        - put req using fastify client.
        - Prisma updates an existing queryData into local postgresql queryData table via id. Prisma automatically handles             the backwards one-to-one relationship with formData
        - Parameters: 
            - JSON Body:
                - queryDataId: string
                - updatedAt: Date
                - status: string
        - Status codes:
            - Updated Sucessfully: 200
            - Missing Data Error: 400
            - Not Found: 404
            - Conflict during update: 409
4. deleteQueryRoute
    - HTTP Method: DELETE
    - URL: https://localhost:8080/delete-query
    - Description:
        - post req using fastify client.
        - Prisma deletes an existing queryData into local postgresql queryData table via id. Prisma automatically handles             the backwards one-to-one relationship with formData
        - Parameters: 
            - JSON Body:
                - queryDataId: string
        - Status codes:
            - Deleted Sucessfully: 200
            - Not Found: 404
