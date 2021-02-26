import { Card, Col, Row, Space } from 'antd';
import React from 'react';
import { CopyClipboard, ImportButton, ImgUpload, RadioTag, RangePicker } from 'stu';
import moment from 'moment';
import styles from './index.less';

const Example = () => {
  function onImport(data) {
    console.log('接收到的数据-->', data);
  }

  const rangerData = {
    changeTimeRange: dates => {
      console.log(dates, 'dates');
    },
    disabledDate: current => {
      return current && current > moment();
    },
    ranges: {
      今天: [moment(), moment()],
      昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
      过去7天: [moment().subtract(7, 'day'), moment().subtract(1, 'day')],
      过去30天: [moment().subtract(30, 'day'), moment().subtract(1, 'day')],
    },
    style: { width: 240 },
    changeCalendarChange: () => {},
  };

  const options = [
    { label: '已中奖', value: 1 },
    { label: '未中奖', value: 2 },
    { label: '其他', value: 3 },
  ];

  return (
    <Row>
      <Col span={6}>
        <Card className={styles.card}>
          <h3>复制剪切板</h3>
          <CopyClipboard text="我是复制信息" />
        </Card>
      </Col>
      <Col span={6}>
        <Card className={styles.card}>
          <h3>Excel导出</h3>
          <ImportButton onImport={onImport} />
        </Card>
      </Col>
      <Col span={6}>
        <Card className={styles.card}>
          <h3>图片上传</h3>
          <ImgUpload />
        </Card>
      </Col>
      <Col span={6}>
        <Card className={styles.card}>
          <h3>时间范围选择器</h3>
          <RangePicker {...rangerData} />
        </Card>
      </Col>
      <Col span={6}>
        <Card className={styles.card}>
          <h3>时间范围选择器</h3>
          <RadioTag options={options} defaultValue={2} />
        </Card>
      </Col>
    </Row>
  );
};

export default Example;
