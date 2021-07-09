import React from "react";

import useAuth from "hooks/useAuth";
import { useStudents, useStudentsAxios } from "api/student";
import { logout } from "api/auth";
import { getToken } from "utils/auth";

import { Button } from "@commitUI/index";
import Table from "components/Table";

const Home = () => {
    const { logout: localLogout } = useAuth();
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
        </div>
    );
};

export default Home;
