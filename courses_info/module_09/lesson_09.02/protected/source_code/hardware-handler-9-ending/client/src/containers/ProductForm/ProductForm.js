import { useEffect, useState } from 'react';
import { Button, notification, Form, Input, InputNumber, Select } from 'antd';
import Loader from '../../components/Loader/Loader';
import {
  ADD_NEW_PRODUCT_ERROR,
  ADD_NEW_PRODUCT_SUCCESS,
  FETCH_DEPARTMENT_DATA_ERROR,
} from '../../constants/constants';
import * as productApi from '../../services/productApi';
import { useDepartments } from '../../hooks/useDepartments';
import './ProductForm.css';

const defaultsForNewProduct = {
  departmentId: null,
  name: '',
  brand: '',
  description: '',
  retailPrice: 0,
};
const ProductForm = () => {
  const [newProduct, setNewProduct] = useState({ ...defaultsForNewProduct });
  const [loading, setLoading] = useState(true);
  const { departments, error } = useDepartments();

  useEffect(() => {
    if (departments.length > 0 || error) {
      setLoading(false);
    }
  }, [departments, error]);

  const onChange = (propName, val) => {
    const updatedProduct = { ...newProduct };
    updatedProduct[propName] = val;
    setNewProduct(updatedProduct);
  };

  const isValid = () => {
    if (!newProduct.departmentId) {
      return false;
    }
    if (!newProduct.name) {
      return false;
    }
    if (!newProduct.brand) {
      return false;
    }
    if (!newProduct.retailPrice) {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const addProduct = await productApi.addNewProduct(newProduct);
    if (addProduct !== ADD_NEW_PRODUCT_ERROR) {
      setNewProduct(defaultsForNewProduct);
      notification.success({
        description: ADD_NEW_PRODUCT_SUCCESS,
        closeIcon: <div />,
      });
    } else {
      notification.error({
        description: `${addProduct} Please refresh the page and try again.`,
        closeIcon: <div />,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="product-form-header">Add A New Product</h1>
      {loading ? <Loader message="Loading new product form data..." /> : null}
      {error ? (
        <p className="product-form">
          {FETCH_DEPARTMENT_DATA_ERROR} Please refresh the page to try again.
        </p>
      ) : null}
      {!loading && !error ? (
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 4,
          }}
        >
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Please select a department..."
              value={newProduct.departmentId || ''}
              onChange={(value) => onChange('departmentId', Number(value))}
            >
              {departments.length > 0
                ? departments.map((dept) => (
                    <Select.Option key={dept.id} value={dept.id}>
                      {dept.name}
                    </Select.Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            name="product name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => onChange('brand', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => onChange('description', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Retail Price"
            rules={[{ required: true }]}
          >
            <InputNumber
              min="0"
              placeholder="Retail Price"
              value={newProduct.retailPrice}
              onChange={(value) => onChange('retailPrice', Number(value))}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
            }}
          >
            <Button
              data-testid="submit"
              type="primary"
              size="large"
              onClick={onSubmit}
              disabled={!isValid()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default ProductForm;
