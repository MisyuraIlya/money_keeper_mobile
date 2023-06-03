import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { useDb } from '../provider/Provider';

const DataContainer = () => {
    const {data} = useDb()
    return (
        <List
            grid={{
            gutter: 16,
            column: 1,
            }}
            dataSource={data}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.title}>
                    {item.title} - {item.price}
                </Card>
            </List.Item>
            )}
        /> 
    );
};

export default DataContainer;