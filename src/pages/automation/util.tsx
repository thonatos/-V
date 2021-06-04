import React from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';

const STATUS_MAP = {
  close: undefined,
  exit: 'red',
};

export const formatName = (val: string) => {
  if (!val) {
    return null;
  }

  return val.toUpperCase();
};

export const formatPercent = (val: number) => {
  if (!val) {
    return '-';
  }

  return `${val}%`;
};

export const formatValue = (val: number) => {
  if (!val) {
    return '-';
  }

  return `$${val.toFixed(8)}`;
};

export const formatStatus = (val: STATUS_TYPE) => {
  if (!val) {
    return '-';
  }

  return <Tag color={STATUS_MAP[val]}>{val.toUpperCase()}</Tag>;
};

export const formatDate = (val: Date) => {
  if (!val) {
    return '-';
  }
  return <Tag>{dayjs(val).format('YYYY-MM-DD HH:mm:ss')}</Tag>;
};

type STATUS_TYPE = 'close' | 'exit';
