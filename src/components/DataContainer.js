import React, { useEffect, useState } from 'react';
import { Card, List, Tabs } from 'antd';
import { useDb } from '../provider/Provider';
import { categories } from '../enums/category';
import moment from 'moment-timezone';


const DataContainer = () => {
    const {methods,data,filteredData,isAll} = useDb()
    return (
        <>
        <Tabs defaultActiveKey="1" items={categories} onChange={methods.filterByTab} />
        <List
            grid={{
            gutter: 16,
            column: 1,
            }}
            dataSource={isAll ? data : filteredData}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.category}>
                    <div>
                        date: {moment(item.date).format('DD-MM-YYYY')}  
                    </div>
                    {item.title} - {item.price}
                </Card>
            </List.Item>
            )}
        /> 

        </>

    );
};

export default DataContainer;