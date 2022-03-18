import knex, { Knex } from "knex";
import dotenv from 'dotenv'


dotenv.config()

// export class BaseDataBase {

//     protected static connection: Knex = knex({
//         client: "mysql",
//             connection: {
//                 host: process.env.DB_HOST,
//                 port: 3306,
//                 user: process.env.DB_USER,
//                 password: process.env.DB_PASS,
//                 database: process.env.DB_SCHEMA,
//             },
//     });
// }

export const connection: Knex = knex({
    client: "mysql",
    connection: {
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       database: process.env.DB_SCHEMA,
       port: 3306,
       multipleStatements: true
    }
 })


// OBS:
// Para Usar BaseDataBase use: BaseDataBase.connection() 