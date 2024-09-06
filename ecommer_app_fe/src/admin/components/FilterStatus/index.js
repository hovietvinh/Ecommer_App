
import { Space, Button} from "antd";

function FilterStatus({currentStatus,handleStatusClick}) {
    return (
        <>
            <Space size="small">
                <Button
                    type={!currentStatus ? 'primary' : 'default'}
                    onClick={() => handleStatusClick('')}
                >
                    Tất cả
                </Button>
                <Button
                    type={currentStatus === 'active' ? 'primary' : 'default'}
                    onClick={() => handleStatusClick('active')}
                >
                    Hoạt động
                </Button>
                <Button
                    type={currentStatus === 'inactive' ? 'primary' : 'default'}
                    onClick={() => handleStatusClick('inactive')}
                >
                    Dừng hoạt động
                </Button>
            
            </Space>
        </>
    );
}

export default FilterStatus;