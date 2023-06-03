import { createContext, useContext, useState, useEffect } from "react";
import { dbService } from "../services/db";

const DbContext = createContext();

const useDb = () => {
    const context = useContext(DbContext);

    if(!context) {
        throw new Error('can not run without "dbProvider');
    }

    return context;
}

const DbProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadData = async () => {
        setLoading(true)
        try {
            const response = await dbService.readAll()
            setData(response)
        } catch(e) {
            console.log('error',e)
        } finally {
            setLoading(false)
        }
    }

    const createData = async (title, price) => {
        setLoading(true)
        try {
            const response = await dbService.create(title, price)
            loadData()
        } catch(e) {
            console.log('error', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    },[])

    const methods = {
        loadData,
        createData
    }
    const value = {
        methods,
        loading,
        data,
    }

    return (<DbContext.Provider value={value} {...props}/>)
}

export {useDb, DbProvider};