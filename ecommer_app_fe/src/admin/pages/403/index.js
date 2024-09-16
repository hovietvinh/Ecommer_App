import React from 'react';
import { Result,Button } from 'antd';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Error() {
    const navigate = useNavigate()
    const {collapsed} = useOutletContext()
    return (
        <>
            <div
                className={`transition-all duration-300 ${
                collapsed
                    ? "ml-[100px] w-[calc(100%-100px)]"
                    : "ml-[230px] w-[calc(100%-230px)]"
                } mt-[20px] mr-[20px]`}
            >
                <Result
                    status="403"
                    title="403"
                    subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
                    extra={
                        <Button type="primary" onClick={() => navigate('/admin/dashboard')}>
                            Quay lại trang tổng quan
                        </Button>
                    }
                />
            </div>
        </>
    );
}

export default Error;