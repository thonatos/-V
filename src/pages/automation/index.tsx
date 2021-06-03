import React, { FC } from 'react';
import dayjs from 'dayjs';
import {
  Affix, Drawer, Table, Button,
} from 'antd';
import { useRequest, useBoolean, useResponsive } from 'ahooks';
import { CalculatorOutlined } from '@ant-design/icons';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';
import Calculator from '@/components/Calculator';

import * as styles from './index.module.less';

const formatName = (val: string) => {
  if (!val) {
    return null;
  }

  return val.toUpperCase();
};

const formatPercent = (val: number) => {
  if (!val) {
    return '-';
  }

  return `${val}%`;
};

const formatValue = (val: number) => val || '-';

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
    render: formatName,
  },
  {
    title: 'Pair',
    dataIndex: 'pair',
    key: 'pair',
    render: formatName,
  },
  {
    title: 'Side',
    dataIndex: 'side',
    key: 'side',
    render: formatName,
  },
  {
    title: 'Take Profit',
    dataIndex: 'take_profit',
    key: 'take_profit',
    render: formatPercent,
  },
  {
    title: 'Stop Loss',
    dataIndex: 'stop_loss',
    key: 'stop_loss',
    render: formatPercent,
  },
  {
    title: 'Open',
    dataIndex: 'open',
    key: 'open',
    render: formatValue,
  },
  {
    title: 'Close',
    dataIndex: 'close',
    key: 'close',
    render: formatValue,
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

const DRAWER_WIDTH_MAP = {
  phone: 300,
  table: 480,
  desktop: 800,
};

type Device = 'phone' | 'table' | 'desktop';

const AutomationPage: FC<Props> = () => {
  const [visible, { toggle }] = useBoolean(false);
  const responsive = useResponsive();
  const [device] = Object.entries(responsive || {}).find(([, actived]) => !actived) || [];

  const drawerWith = device ? DRAWER_WIDTH_MAP[device as Device] : 400;

  const {
    data, error, loading, run,
  } = useRequest(() => ({
    url: 'https://api.implements.io/orders',
    method: 'get',
  }));

  if (error) {
    return null;
  }

  return (
    <Layout title="Automation">
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
          title={() => (
            <div className={styles.title}>
              <span>Quantitative/Automation Trading</span>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  run();
                }}
              >
                Reload
              </Button>
            </div>
          )}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
        />

        <Drawer
          title="Calculator"
          visible={visible}
          width={drawerWith}
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
