import {DB} from '../../app/database'
import {usuario} from '../types/usuario'


export async function listarusuarios(db : DB): Promise<usuario[]> {
return db.getAllAsync<usuario>('SELECT * FROM usuarios ORDER by id desc')
}

export async function adicionarusuariosDB(
db : DB,
nome: string,
email: string,


):Promise<void> {
    await db.runAsync(
        'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
        [nome, email],

    );

}

export async function removerusuario(db : DB, id : number): Promise<void> {
     await db.runAsync('DELETE FROM usuarios where id = ?', [id]);
}
