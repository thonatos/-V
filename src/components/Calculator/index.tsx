import React, { useState } from 'react';
import { Form, Button, InputNumber } from 'antd';

const Calculator: React.FC<Props> = () => {
  const [values, setValues] = useState({
    open: 0,
    close: 0,
    take_profit: 4.0,
    stop_loss: 4.0,
  });

  const onFinish = (values: any) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: any) => {
    setValues({
      ...values,
      ...changedValues,
    });
  };

  const {
    open, close, take_profit, stop_loss,
  } = values;

  const _takeProfit = (open * (1 + take_profit / 100)).toFixed(4);
  const _stopLoss = (open * (1 - stop_loss / 100)).toFixed(4);
  const _close = (close - open).toFixed(4);

  return (
    <Form
      name="calculator"
      layout="vertical"
      initialValues={values}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="Entry"
        name="open"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Close"
        name="close"
        rules={[{ required: false }]}
        extra={_close}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Take Profit"
        name="take_profit"
        rules={[{ required: false }]}
        extra={_takeProfit}
      >
        <InputNumber
          min={0}
          precision={4}
          formatter={(value) => `${value}%`}
        />
      </Form.Item>

      <Form.Item
        label="Stop Loss"
        name="stop_loss"
        rules={[{ required: false }]}
        extra={_stopLoss}
      >
        <InputNumber
          min={0}
          precision={4}
          formatter={(value) => `${value}%`}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};

export default Calculator;

interface Props {

}
