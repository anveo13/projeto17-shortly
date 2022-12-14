import {connection} from "../database/db.js";
import { stripHtml } from "string-strip-html";
import {loginSchema} from "../models/signSchemas.js";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from "uuid";
import moment from "moment";


async function signIn(req, res){
    let {email, password} = req.body;
    email = stripHtml(email).result.trim();
    password = stripHtml(password).result.trim();

    const now = moment();
    const createdAt = now.format();

    try {
        const validation = loginSchema.validate({email, password}, {abortEarly: false});

        if(validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        const userExist = await connection.query(
            'SELECT email FROM users WHERE email = $1',
            [email]
        );

        if(userExist.rows.length === 0){
            return res.sendStatus(401);
        };

        let userPassword = await connection.query(
            'SELECT password FROM users WHERE email = $1',
            [email]
        );
        userPassword = userPassword.rows[0].password;

        const isValid = bcrypt.compareSync(password, userPassword);

        if(!isValid){
            return res.sendStatus(401);
        };

        const token = uuidv4();

        let userId = await connection.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );
        userId = userId.rows[0].id;

        await connection.query(
            'INSERT INTO sessions ("userId", token, createdAt) VALUES ($1, $2, $3)',
            [userId, token, createdAt]
        );
        
        return res.status(200).send({token});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {signIn};