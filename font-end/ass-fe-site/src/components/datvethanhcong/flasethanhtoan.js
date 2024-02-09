import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Result
      status="500"
      title="Rất tiếc, MaiLinhTour xin thông báo bạn thanh toán thất bại"
      subTitle="Thanh toán thất bại."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default ErrorPage;
