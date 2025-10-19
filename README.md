## About 
- Full-stack query management system demonstrating production patterns with 

<img width="902" height="225" alt="image" src="https://github.com/user-attachments/assets/a32fe63b-f943-4c1a-875e-cb2a176d54b8" />


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

## Tech stack
* [Node](https://nodejs.org/en/)
* [Typescript](www.google.com)
* [Fastify](https://www.fastify.io/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker and Compose](https://www.docker.com/)

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
