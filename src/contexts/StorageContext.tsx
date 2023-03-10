import { useState, createContext, ReactNode } from 'react'

interface iContext {
    logged: boolean,
    setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export const StorageContext = createContext<iContext>({ logged: false, setLogged: () => { } });

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [logged, setLogged] = useState(false);

    return (
        <StorageContext.Provider value={{ logged, setLogged }}>
            {children}
        </ StorageContext.Provider>
    )
}