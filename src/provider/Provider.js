import { createContext, useContext, useState, useEffect } from "react";
import { dbService } from "../services/db";
import { categories } from "../enums/category";
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
    const [filteredData, setFilteredData] = useState([])
    const [isAll, setIsAll] = useState(true)
    
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

    const createData = async (title, price, category) => {
        setLoading(true)
        try {
            const response = await dbService.create(title, price, category)
            loadData()
        } catch(e) {
            console.log('error', e)
        } finally {
            setLoading(false)
        }
    }

    const filterByTab = (tabId) => {
        if(tabId == 1) {
            setIsAll(true)
        } else {
            setIsAll(false)
        }
        if(tabId !== 1) {
            setLoading(true)
            try {
                const findCategory = categories.filter((ind) => ind.key === tabId)
                const filter = data.filter((item) => item.category === findCategory[0].value)
                setFilteredData(filter)
            } catch(e) {
                console.log('error', e)
            } finally {
                setLoading(false)
            }
        } 
    }

    useEffect(() => {
        loadData()
    },[])

    const methods = {
        loadData,
        createData,
        filterByTab
    }
    const value = {
        methods,
        loading,
        data,
        filteredData,
        isAll
    }

    return (<DbContext.Provider value={value} {...props}/>)
}

export {useDb, DbProvider};