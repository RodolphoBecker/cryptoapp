import { Spin } from "antd";

const Loading = () => {
	return (
        <div style={{ height: 'calc(100vh - 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin tip="Loading..." />
        </div>
	);
};

export default Loading;
