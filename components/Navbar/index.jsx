import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined,  MenuOutlined }  from '@ant-design/icons';

import icon from '../../src/images/cryptocurrency.png';

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                {/* <Button className="menu-control-container"/> */}
            </div>
        </div>
    )
}

export default Navbar