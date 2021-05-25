import React, { FC } from 'react';
// import { Carousel } from 'stu';
import SwitchModule from './components/SwitchModule';
import styles from './index.less';

export interface LoginProps {
  title?: string;
}

const LoginLayout: FC<LoginProps> = (props) => {
  return (
    <div className={styles['stu-login']}>
      <h1 className={styles.title}>{props.title}</h1>
      <div className={styles.content}>
        {/* <Carousel
          imgList={[
            'https://sl-online-oss.shulidata.com/base_web_component/publicity-01.png',
            'https://sl-online-oss.shulidata.com/base_web_component/publicity-02.png',
            'https://sl-online-oss.shulidata.com/base_web_component/publicity-03.png',
          ]}
        /> */}
        <div className={styles.card}>
          <SwitchModule />
        </div>
      </div>
    </div>
  );
};

LoginLayout.defaultProps = {
  title: '通用管理后台',
};

export default LoginLayout;
