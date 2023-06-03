import { AimOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { useDb } from '../provider/Provider';
const MyForm = () => {

  const [form] = Form.useForm();
  const {methods} = useDb()
  const onFinish = async (values) => {
    try { 
      const result = await methods.createData(values.title, values.price)

      notification.success( {
        message: "success!",
        description: "created",
        duration: 2
    })
    } catch(err) {
      console.warn("create error",err)
      notification.error({
        message:"error!",
        description:"cannot create",
        duration:2
    })
    }
  };

  return (
    <div style={{marginTop:'50px',marginBottom:'10px'}}>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'the title must be not empty',
            },
          ]}
        >
          <Input prefix={<AimOutlined className="site-form-item-icon" />} placeholder="title" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: 'the price must be not empty',
            },
          ]}
        >
          <Input prefix={<AimOutlined className="site-form-item-icon" />} placeholder="price" />
        </Form.Item>
        <Form.Item >
            <Button
              type="primary"
              htmlType="submit"
            >
              create
            </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;