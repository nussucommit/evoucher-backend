import React, { useState } from "react";

import useAuth from "hooks/useAuth";
import { useStudents, useStudentsAxios } from "api/student";
import { logout } from "api/auth";
import { getToken } from "utils/auth";
import useModal from "hooks/useModal";

import { Button, Modal } from "@commitUI/index";
import Table from "components/Table";

const MOCK_VOUCHERS: Voucher[] = [
    {
        id: "1",
        posted_date: "2021-04-12T08:06:12Z",
        available_date: "2021-04-11T16:00:00Z",
        expiry_date: "2021-04-22T16:00:00Z",
        name: "test",
        voucher_type: "Food",
        description: "test",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/github-icon.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=hid0PNRsoOZTZkxei5NtJfA2YQc%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "2",
        posted_date: "2021-04-13T13:21:24Z",
        available_date: "2021-04-14T16:00:00Z",
        expiry_date: "2021-04-22T16:00:00Z",
        name: "ddd",
        voucher_type: "Food",
        description: "fdfdafds",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/email.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=NzXPd75KgirJk7IGFi9kdD5yPXo%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "3",
        posted_date: "2021-04-14T05:18:40Z",
        available_date: "2021-04-13T16:00:00Z",
        expiry_date: "2021-04-21T16:00:00Z",
        name: "hello",
        voucher_type: "Sport",
        description: "I am a testing thing",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/photo_2021-01-03_19-53-44.jpg?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=jn750tbIhGTvyrmitvtTEG2XS0A%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "5",
        posted_date: "2021-04-14T15:30:46Z",
        available_date: "2021-04-13T16:00:00Z",
        expiry_date: "2021-04-29T16:00:00Z",
        name: "asasf",
        voucher_type: "Food",
        description: "asdasf",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/sadasdasdad_jAqtGX0.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=tqUJfWQ8p0XpaBMnt%2BNsBNx9DXw%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "4",
        posted_date: "2021-04-14T15:48:48Z",
        available_date: "2021-04-13T16:00:00Z",
        expiry_date: "2021-04-29T16:00:00Z",
        name: "asdasf",
        voucher_type: "Food",
        description: "asdads",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/sadasdasdad.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=MuRSprTsRh4YJwx2D89Z7E2sD8w%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "6",
        posted_date: "2021-04-14T15:51:59Z",
        available_date: "2021-04-13T16:00:00Z",
        expiry_date: "2021-04-29T16:00:00Z",
        name: "test2",
        voucher_type: "Food",
        description: "sfdsfgsfg",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/house.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=eIqEU0hxikmwwCKH5DkY03zj5Ao%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "8",
        posted_date: "2021-04-14T17:09:15Z",
        available_date: "2021-04-14T16:00:00Z",
        expiry_date: "2021-04-29T16:00:00Z",
        name: "test",
        voucher_type: "Food",
        description: "fsfdsfda",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/email.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=NzXPd75KgirJk7IGFi9kdD5yPXo%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "7",
        posted_date: "2021-04-14T17:11:35Z",
        available_date: "2021-04-14T16:00:00Z",
        expiry_date: "2021-04-29T16:00:00Z",
        name: "testtest3",
        voucher_type: "Sport",
        description: "testtest3",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/sadasdasdad_oPjrHQn.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=pkgo67TAbq6AHG%2FFBOSll5Db4Ng%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "9",
        posted_date: "2021-04-14T17:15:44Z",
        available_date: "2021-04-14T16:00:00Z",
        expiry_date: "2021-04-22T16:00:00Z",
        name: "sfdsfd",
        voucher_type: "Sport",
        description: "sfdsfdsfda",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/smartphone.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=Lst30b%2BNrW6i693pUP3TG4Z%2Fhx0%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
    {
        id: "10",
        posted_date: "2021-04-17T13:40:59Z",
        available_date: "2021-04-17T16:00:00Z",
        expiry_date: "2021-04-29T16:00:00Z",
        name: "test",
        voucher_type: "Food",
        description: "fsdsfdsfda",
        counter: 0,
        image:
            "https://s3.ap-southeast-1.amazonaws.com/evoucher-bucket2/images/assets/SeEduLogo.png?AWSAccessKeyId=AKIAXKP65BHU3UH3VKOZ&Signature=T0XL2G3lPWg9aA5drHQ3MLPKU2c%3D&Expires=1625920242",
        code_uploaded: false,
        organization: "org1",
    },
];

const Home = () => {
    const { logout: localLogout } = useAuth();
    const { isOpen, onClose, onOpen } = useModal();

    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "3",
            name: "Jane",
            age: 42,
            address: "10 Downing Street",
        },
    ];
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];

    return (
        <div>
            <h1>Home</h1>
            <Table dataSource={dataSource} columns={columns} />;
            <Button onClick={onOpen}>Open Modal</Button>
            <Button
                onClick={() => {
                    const token = getToken();
                    console.log(token);
                    logout({ refresh_token: token!.refresh });
                    localLogout();
                }}
            >
                Log out
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                footer={
                    <div style={{ display: "flex" }}>
                        <Button style={{ marginRight: 10 }}>Close</Button>
                        <Button>Okay</Button>
                    </div>
                }
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
};

export default Home;
