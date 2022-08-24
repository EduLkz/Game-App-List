import { createContext } from "react";

export const GamesContext = createContext(null)

export const accounts = [
    {
        id: 0,
        login: 'admin',
        password: 'admin',
        email: 'admin@admin.com',
        fullname: 'ADMIN'
    },{
        id: 1,
        login: 'edlkz',
        password: '12345',
        email: 'edurocha@admin.com',
        fullname: 'Eduardo Almeida Rocha'
    }
]