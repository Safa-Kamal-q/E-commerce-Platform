import '../dist/config.js';
import dataSource from '../dist/db/dataSource.js';
import express from 'express'
import request from 'supertest'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

beforeAll(async () => {
    await dataSource.initialize().then(() => {
        console.log('DB connected');
    }).catch(err => {
        console.log("DB connection failed", err);
    });
}, 30000);

afterAll(async () => {
    await dataSource.destroy();
});


import { login } from "../dist/controllers/authController.js";
import jwt from 'jsonwebtoken';

let validToken;

describe("Login process", () => {
    const validData = {
        "email": "test@gmail.com",
        "password": "123456789"
    };

    beforeAll(async () => {
        validToken = await login(validData.email, validData.password);
    })

    it("returns a token", async () => {
        expect(validToken.token).toBeTruthy();
    });

    it("has a valid token", () => {
        const tokenIsValid = jwt.verify(validToken.token, process.env.SECRET_KEY || '');
        expect(tokenIsValid).toBeTruthy();
    });

    it("has valid payload", () => {
        const payload = jwt.decode(validToken.token, { json: true });
        expect(payload?.email).toEqual(validData.email);
    });
});


import usersRouter from "../dist/routers/authRouter.js";
app.use("/users", usersRouter);

describe('POST /users/login', () => {
    it('should return a 200 status code and set cookies on successful login', async () => {
        const validData = {
            "email": "test@gmail.com",
            "password": "123456789"
        };
        
        const response = await request(app)
            .post('/users/login')
            .send(validData);

        expect(response.status).toBe(200);
        expect(response.header['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('fullName='),
                expect.stringContaining('loginTime='),
                expect.stringContaining('token='),
            ])
        );
        expect(response.body.fullName).toBeDefined();
        expect(response.body.token).toBeDefined();
    });

    it('should return a 401 status code on failed login', async () => {

        const invalidData = {
            "email": "test1@gmail.com",
            "password": "123456789"
        };

        const response = await request(app)
            .post('/users/login')
            .send(invalidData);

        expect(response.status).toBe(401);
    });
});





import { insertPermission } from "../dist/controllers/permissionController.js";

describe("insertPermission", () => {
    it("should insert a permission", async () => {
        const payload = { name: "PUT_users/" };

        const result = await insertPermission(payload);

        expect(result.name).toBe("PUT_users/");
    });
});


import permissionRouter from "../dist/routers/permissionRouter.js";
app.use("/permissions", permissionRouter);

describe('POST /permissions', () => {
    it('should return a 201 status code ', async () => {

        const response = await request(app)
            .post('/permissions')
            .set('Authorization', validToken.token)
            .send({ name: "GET_users/:email" });
        expect(response.status).toBe(201);

        expect(response.text).toBe("Permission added successfully");
    });

    it('should return a 400 in name of permission missed ', async () => {
        const response = await request(app)
            .post('/permissions')
            .set('Authorization', validToken.token)
            .send({ name: "" });

        expect(response.status).toBe(400);
    });
    it('should return a 401 for invalid token', async () => {
        const response = await request(app)
            .post('/permissions')
            .set('Authorization', '11')
            .send({ name: "GET_users/:email" });

        expect(response.status).toBe(401);
    });
});

import { insertRole } from "../dist/controllers/roleController.js";

describe("insertRole", () => {
    it("should insert a role", async () => {
        const payload = {
            "name": "seller",
            "permissions": ["1", "2", "3"]
        };

        const result = await insertRole(payload);

        const idArray = []
        result.permissions.forEach(permission => {
            idArray.push(permission.id)
        })

        const numbers = [1, 2, 3]

        const allNumbersExist = numbers.every(number => idArray.includes(number));

        expect(result.name).toBe("seller");
        expect(allNumbersExist).toBeTruthy();
    });
});



import roleRouter from "../dist/routers/roleRouter.js";
app.use("/roles", roleRouter);

describe('POST /roles', () => {
    it('should return a 200 status code ', async () => {

        const response = await request(app)
            .post('/roles')
            .set('Authorization', validToken.token)
            .send({
                "name": "admin",
                "permissions": ["1", "2", "3"]
            })

        expect(response.status).toBe(201);
        expect(response.text).toBe("Role added successfully");
    });

    it('should return a 400 if name of role missed or permissions ', async () => {
        const response = await request(app)
            .post('/roles')
            .set('Authorization', validToken.token)
            .send({ name: "" });

        expect(response.status).toBe(400);
    });

    it('should return a 400 if name of role not seller | admin | buyer ', async () => {
        const response = await request(app)
            .post('/roles')
            .set('Authorization', validToken.token)
            .send({ name: "test" });

        expect(response.status).toBe(400);
    });

    it('should return a 400 if name already exist in DB ', async () => {
        const response = await request(app)
            .post('/roles')
            .set('Authorization', validToken.token)
            .send({ name: "seller", "permissions": ["1", "2", "3"] });

        expect(response.status).toBe(400);
    });


    it('should return a 401 for invalid token', async () => {
        const response = await request(app)
            .post('/roles')
            .set('Authorization', '11') //add any invalid token 
            .send({
                "name": "admin",
                "permissions": ["1", "2", "3"]
            })

        expect(response.status).toBe(401);
    });
});
