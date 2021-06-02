import React, { FC } from 'react';
import dayjs from 'dayjs';
import {
  Affix, Drawer, Table, Button,
} from 'antd';
import { useRequest, useBoolean } from 'ahooks';
import { CalculatorOutlined } from '@ant-design/icons';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';
import Calculator from '@/components/Calculator';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
    render: (val: string) => val && val.toUpperCase(),
  },
  {
    title: 'Pair',
    dataIndex: 'pair',
    key: 'pair',
    render: (val: string) => val && val.toUpperCase(),
  },
  {
    title: 'Side',
    dataIndex: 'side',
    key: 'side',
    render: (val: string) => val && val.toUpperCase(),
  },
  {
    title: 'Take Profit',
    dataIndex: 'take_profit',
    key: 'take_profit',
    render: (val: number) => val && `${val}%` || '-',
  },
  {
    title: 'Stop Loss',
    dataIndex: 'stop_loss',
    key: 'stop_loss',
    render: (val: number) => val && `${val}%` || '-',
  },
  {
    title: 'Open',
    dataIndex: 'open',
    key: 'open',
    render: (val: number) => val || '-',
  },
  {
    title: 'Close',
    dataIndex: 'close',
    key: 'close',
    render: (val: number) => val || '-',
  },
  {
    title: 'Contracts',
    dataIndex: 'contracts',
    key: 'contracts',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
    render: (_: number, record: any) => {
      const {
        side, open, close, contracts,
      } = record;
      const diff = close - open;

      if (side === 'long') {
        return (diff * contracts).toFixed(4);
      }

      if (side === 'short') {
        return -(diff * contracts).toFixed(4);
      }

      return '';
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (val: string) => val && val.toUpperCase(),
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: Date) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
  },
];

const AutomationPage: FC<Props> = () => {
  const [visible, { toggle }] = useBoolean(false);
  const { data, error, loading } = useRequest(() => ({
    url: 'https://api.implements.io/orders',
    method: 'get',
  }));

  if (error) {
    return null;
  }

  return (
    <Layout title="Trading">
      <Affix style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button type="primary" onClick={() => toggle()}>
          <CalculatorOutlined />
          {' '}
          Calculator
        </Button>
      </Affix>

      <Detail>

        <Table
          rowKey="id"
          loading={loading}
          title={() => <div>Quantitative/Automation Trading</div>}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
        />

        <Drawer
          title="Calculator"
          visible={visible}
          width={800}
          onClose={() => toggle()}
          mask
          maskClosable={false}
        >
          <Calculator />
        </Drawer>
      </Detail>
    </Layout>
  );
};

export default AutomationPage;

interface Props { }
