import Postagem from "./Postagem"

interface User{
    id: number
    usuario: string
    senha: string
    foto: string
    postagens?: Postagem[];
}

export default User