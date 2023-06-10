import { AimOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { useDb } from '../provider/Provider';
import FormItem from 'antd/es/form/FormItem';
import { categories } from '../enums/category';
const MyForm = () => {

  const [form] = Form.useForm();
  const {methods} = useDb()
  const [selected, setSelected] = useState()
  const onChange = (value) => {
    setSelected(value)
  };
  const onSearch = (value) => {
  }; 

  const onFinish = async (values) => {
    try { 
      const result = await methods.createData(values.title, values.price,selected)

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
          style={{padding:'5px',width:'100%'}}
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
          style={{padding:'5px',width:'100%'}}
          rules={[
            {
              required: true,
              message: 'the price must be not empty',
            },
          ]}
        >
          <Input prefix={<AimOutlined className="site-form-item-icon" />} placeholder="price" />
        </Form.Item>
        <FormItem style={{width:'100%'}}>
        <Select
          showSearch
          style={{padding:'5px'}}
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={categories}
        />
        </FormItem>
        <Form.Item style={{width:'100%',padding:'20px'}}>
            <Button
              type="primary"
              htmlType="submit"
              style={{width:'100%'}}
            >
              create
            </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;