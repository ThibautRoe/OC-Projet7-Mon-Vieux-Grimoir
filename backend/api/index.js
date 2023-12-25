import configureApp from "../app.js"

const swaggerJson = {
    openapi: "3.1.0",
    info: {
        title: "API Mon Vieux Grimoire",
        version: "1.0.0",
    },
    servers: [
        {
            url: "https://oc-7-mon-vieux-grimoire-back-end.vercel.app",
        },
        {
            url: "http://localhost:4000",
        },
    ],
    tags: [
        {
            name: "user",
            description: "User operations",
        },
        {
            name: "book",
            description: "Books operations",
        },
    ],
    paths: {
        "/api/auth/signup": {
            post: {
                tags: ["user"],
                summary: "User Signup",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    201: {
                        description: "Signup successful",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            examples: "User created successfully",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/login": {
            post: {
                tags: ["user"],
                summary: "User Login",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Login successful",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type: "string",
                                            examples: "654321",
                                        },
                                        token: {
                                            type: "string",
                                            examples: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/books": {
            get: {
                tags: ["book"],
                summary: "Get All Books",
                responses: {
                    200: {
                        description: "List of all books",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Book_response",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["book"],
                summary: "Create Book",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    book: {
                                        type: "string",
                                        examples:
                                            '{"userId":"654321","title":"Book title","author":"Book author","year":1999,"genre":"Book genre"}',
                                    },
                                    image: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    201: {
                        description: "Book created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            examples: "Book created successfully",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/books/{id}": {
            get: {
                tags: ["book"],
                summary: "Get Single Book",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Single book details",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Book_response",
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ["book"],
                summary: "Update Book",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    book: {
                                        type: "string",
                                        examples:
                                            '{"userId":"654321","title":"Book title","author":"Book author","year":1999,"genre":"Book genre"}',
                                    },
                                    image: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                        },
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Book_JSON",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Book modified successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            examples: "Book modified successfully",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["book"],
                summary: "Delete Book",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Book deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            examples: "Book deleted successfully",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/books/bestrating": {
            get: {
                tags: ["book"],
                summary: "Get Best Rating Books",
                responses: {
                    200: {
                        description: "List of books with best ratings",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Book_response",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/books/{id}/rating": {
            post: {
                tags: ["book"],
                summary: "Set Book Rating",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Book_set_rating",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Book rating set successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Book_response",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        examples: "email@domain.com",
                    },
                    password: {
                        type: "string",
                        examples: "MyStrongPassword1!",
                    },
                },
            },
            Book_JSON: {
                type: "object",
                properties: {
                    userId: {
                        type: "string",
                        examples: "654321",
                    },
                    title: {
                        type: "string",
                        examples: "Book title",
                    },
                    author: {
                        type: "string",
                        examples: "Book author",
                    },
                    year: {
                        type: "number",
                        examples: 1999,
                    },
                    genre: {
                        type: "string",
                        examples: "Book genre",
                    },
                },
            },
            Book_set_rating: {
                type: "object",
                properties: {
                    userId: {
                        type: "string",
                        examples: "654321",
                    },
                    rating: {
                        type: "number",
                        minimum: 0,
                        maximum: 5,
                        examples: 5,
                    },
                },
            },
            Book_response: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                        examples: "654321",
                    },
                    userId: {
                        type: "string",
                        examples: "654321",
                    },
                    title: {
                        type: "string",
                        examples: "Book title",
                    },
                    author: {
                        type: "string",
                        examples: "Book author",
                    },
                    imageUrl: {
                        type: "string",
                        examples: "https://url.com/image.png",
                    },
                    year: {
                        type: "number",
                        examples: 1999,
                    },
                    genre: {
                        type: "string",
                        examples: "Book genre",
                    },
                    ratings: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                userId: {
                                    type: "string",
                                    examples: "654321",
                                },
                                grade: {
                                    type: "number",
                                    minimum: 0,
                                    maximum: 5,
                                    examples: 5,
                                },
                                _id: {
                                    type: "string",
                                    examples: "654321",
                                },
                            },
                        },
                    },
                    averageRating: {
                        type: "number",
                        minimum: 0,
                        maximum: 5,
                        examples: 5,
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
}

const app = await configureApp(swaggerJson)

export default app
