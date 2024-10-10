import React from 'react';
import { Button, Spin } from 'antd';
const SpinScreen = () => {

 
  return (
    <>
      {/* <Button onClick={showLoader}>Show fullscreen</Button> */}
      <Spin spinningpercent={"auto"} fullscreen />
    </>
  );
};
export default SpinScreen;