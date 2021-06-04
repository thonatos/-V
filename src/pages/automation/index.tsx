import React, { FC } from 'react';
import {
  Space, Drawer, Table, Button, Tag, Typography,
} from 'antd';
import {
  useRequest, useBoolean, useResponsive, useReactive,
} from 'ahooks';
import { CalculatorOutlined, ReloadOutlined } from '@ant-design/icons';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';
import Calculator from '@/components/Calculator';
import {
  formatName, formatValue, formatPercent, formatStatus, formatDate,
} from '@/components/util';

import * as styles from './index.module.less';

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
    width: 120,
    key: 'take_profit',
    render: formatPercent,
  },
  {
    title: 'Stop Loss',
    dataIndex: 'stop_loss',
    key: 'stop_loss',
    width: 120,
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
    render: (_: number, record: Order) => {
      const {
        side, open, close, contracts,
      } = record;

      if (!side) {
        return '-';
      }

      if (!close) {
        return '-';
      }

      const diff = close - open;
      const profit = diff * contracts;
      const percent = (diff / open) * 100;

      const direction = side === 'long' ? 1 : -1;
      const color = direction * diff > 0 ? 'green' : 'red';

      return (
        <Tag color={color}>
          {`$${(direction * profit).toFixed(4)}`}
          {' '}
          /
          {' '}
          {`${(direction * percent).toFixed(4)}%`}
        </Tag>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: formatStatus,
  },
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: formatDate,
  },
  {
    title: 'Updated',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: formatDate,
  },
];

const AutomationPage: FC<Props> = () => {
  const state = useReactive({
    current: 1,
    pageSize: 20,
  });

  const [visible, { toggle }] = useBoolean(false);

  const responsive = useResponsive() || {};
  const isLarge = responsive.large;
  const isMiddle = responsive.middle;
  const isSmall = responsive.small;

  let drawerWith = 400;

  if (isSmall) {
    drawerWith = 300;
  }

  if (isMiddle) {
    drawerWith = 480;
  }

  if (isLarge) {
    drawerWith = 800;
  }

  const {
    data: count, run: runCount,
  } = useRequest(() => ({
    url: 'https://api.implements.io/orders/count',
    method: 'get',
  }));

  const {
    data: orders, error, loading, run: runOrders,
  } = useRequest(() => {
    const skip = (state.current - 1) * state.pageSize;
    const query = `_sort=created_at:DESC&_limit=${state.pageSize}&_start=${skip}`;
    return {
      url: `https://api.implements.io/orders?${query}`,
      method: 'get',
    };
  }, {
    ready: !!count,
  });

  const load = async () => {
    await runCount();
    await runOrders();
  };

  const handleReload = async () => {
    state.current = 1;
    state.pageSize = 20;

    load();
  };

  const handleChange = async (pageNumber: number, pageSize?: number) => {
    state.current = pageNumber;
    if (pageSize) {
      state.pageSize = pageSize;
    }

    load();
  };

  if (error) {
    return null;
  }

  return (
    <Layout title="Automation">
      <Detail>
        <Table
          rowKey="id"
          loading={loading}
          title={() => (
            <div
              className={styles.title}
              style={{
                flexDirection: isLarge ? 'row' : 'column',
              }}
            >
              <div>
                <Typography.Title level={4}>Quantitative/Automation Trading</Typography.Title>
              </div>
              <Space align="center" direction="horizontal">
                <Button
                  type="primary"
                  size="small"
                  icon={<ReloadOutlined />}
                  onClick={handleReload}
                >
                  Reload
                </Button>

                <Button
                  type="primary"
                  size="small"
                  icon={<CalculatorOutlined />}
                  onClick={() => toggle()}
                >
                  Calculator
                </Button>
              </Space>
            </div>
          )}
          columns={columns}
          dataSource={orders}
          scroll={{ x: 1300 }}
          pagination={{
            total: count || 0,
            current: state.current,
            pageSize: state.pageSize,
            showSizeChanger: true,
            onChange: handleChange,
          }}
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

interface Order {
  side: string;
  open: number;
  close: number;
  contracts: number;
}
