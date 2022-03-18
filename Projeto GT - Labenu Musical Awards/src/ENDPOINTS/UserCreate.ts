import { Request, Response } from "express"
import { connection } from "../Data/BaseDataBase"
import { Authenticator } from "../Services/Authenticator"
import { HashManager } from "../Services/hashManeger"
import { IdGenerator } from "../Services/idGenerator"



export const CreateUser = async (req: Request, res: Response) => {
    try {
       let message = "Success!"
       const { name, email, password } = req.body
 
       if (!name || !email || !password) {
          res.statusCode = 406
          message = '"name", "email" and "password" must be provided'
          throw new Error(message)
       }
       
       const newId = new IdGenerator()
       const id: string = newId.generateId()
 

       const hashM = new HashManager()
       const cypherPassword = await hashM.hash(password);
 
       await connection
       ('labook_users')
          .insert({
             id,
             name,
             email,
             password: cypherPassword
          })
 
          const ALT_DT = new Authenticator()
       const token: string = ALT_DT.generateToken({ id })
 
       res.status(201).send({ message, token })
 
    } catch (error: any) {
       res.statusCode = 400
       let message = error.sqlMessage || error.message
 
       res.send({ message })
    }
 }