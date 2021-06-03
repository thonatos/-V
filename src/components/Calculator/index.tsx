import React, { useState } from 'react';
import { Form, Button, InputNumber } from 'antd';

const Calculator: React.FC<Props> = () => {
  const [values, setValues] = useState({
    open: 36000,
    close: 0,
    take_profit: 2.0,
    stop_loss: 1.0,
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

  const targetTakeProfit = (open * (1 + take_profit / 100)).toFixed(4);
  const targetStopLoss = (open * (1 - stop_loss / 100)).toFixed(4);
  const targetClose = (close - open).toFixed(4);

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
        extra={targetClose}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Take Profit"
        name="take_profit"
        rules={[{ required: false }]}
        extra={targetTakeProfit}
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
        extra={targetStopLoss}
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
