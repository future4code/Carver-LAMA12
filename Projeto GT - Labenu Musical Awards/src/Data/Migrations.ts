import { connection } from "./BaseDataBase"

export const Migrations = async () => {
    try{
        await connection.raw(`
          CREATE TABLE IF NOT EXISTS LAMA_Bands (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            music_genre VARCHAR(255) NOT NULL,
            responsible VARCHAR(255) UNIQUE NOT NULL 
            );
        
          CREATE TABLE IF NOT EXISTS LAMA_Shows (
            id VARCHAR(255) PRIMARY KEY,
            week_day VARCHAR(255) NOT NULL,
            start_time INT NOT NULL,
            end_time INT NOT NULL,
            band_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(band_id) REFERENCES LAMA_Bands(id)
            );
          
          CREATE TABLE IF NOT EXISTS LAMA_Users (
              id VARCHAR(255) PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL UNIQUE,
              password VARCHAR(255) NOT NULL,
              role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
              );
            `)
        console.log("Banco de dados adicionado/atualizado com sucesso...")
    }catch{
        console.log("Algo de errado, NÃO ESTÁ CERTO...")
    }


}

