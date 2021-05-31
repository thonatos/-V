import React, { FC } from 'react';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';

const TradingPage: FC<Props> = (props) => (
  <Layout title="Trading">
    <Detail>
      Quantitative Trading
    </Detail>
  </Layout>
);

export default TradingPage;

interface Props { }
