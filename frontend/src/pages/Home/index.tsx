import React, { useState } from "react";

import useAuth from "hooks/useAuth";
import { useStudents, useStudentsAxios } from "api/student";
import { logout } from "api/auth";
import { getToken } from "utils/auth";
import useModal from "hooks/useModal";
import { useVoucher, useVouchers } from "api/voucher";

import { Button, Modal } from "@commitUI/index";
import Table from "components/Table";
import VoucherCard from "components/VoucherCard";

const Home = () => {
    const { logout: localLogout } = useAuth();
    const { isOpen, onClose, onOpen } = useModal();
    // const {data: vouchers} = useVouchers("placeholder");
    const vouchers = [
        { id: 59, voucher_id: 20, code_id: 103, email_id: 9 },
        { id: 67, voucher_id: 24, code_id: 111, email_id: 9 },
        { id: 68, voucher_id: 25, code_id: 112, email_id: 9 },
        { id: 69, voucher_id: 26, code_id: 113, email_id: 9 },
        { id: 70, voucher_id: 27, code_id: 114, email_id: 9 },
        { id: 71, voucher_id: 28, code_id: 115, email_id: 9 },
        { id: 72, voucher_id: 29, code_id: 116, email_id: 9 },
        { id: 73, voucher_id: 30, code_id: 117, email_id: 9 },
        { id: 74, voucher_id: 31, code_id: 118, email_id: 9 },
        { id: 75, voucher_id: 32, code_id: 119, email_id: 9 },
        { id: 76, voucher_id: 33, code_id: 120, email_id: 9 },
        { id: 77, voucher_id: 34, code_id: 121, email_id: 9 },
        { id: 78, voucher_id: 35, code_id: 122, email_id: 9 },
        { id: 79, voucher_id: 36, code_id: 123, email_id: 9 },
        { id: 80, voucher_id: 37, code_id: 124, email_id: 9 },
        { id: 81, voucher_id: 38, code_id: 125, email_id: 9 },
        { id: 82, voucher_id: 39, code_id: 126, email_id: 9 },
        { id: 83, voucher_id: 40, code_id: 127, email_id: 9 },
        { id: 84, voucher_id: 41, code_id: 128, email_id: 9 },
        { id: 85, voucher_id: 42, code_id: 129, email_id: 9 },
        { id: 86, voucher_id: 43, code_id: 130, email_id: 9 },
        { id: 87, voucher_id: 44, code_id: 131, email_id: 9 },
        { id: 116, voucher_id: 46, code_id: 160, email_id: 9 },
    ];
    const [openVoucher, setOpenVoucher] = useState<number>();
    const { data: voucher } = useVoucher(openVoucher || 0);

    const openModal = (voucherID: number) => {
        setOpenVoucher(voucherID);
        onOpen();
    };

    return (
        <div style={{ backgroundColor: "#EDEDED" }}>
            <h1>Home</h1>
            {/* <Table dataSource={dataSource} columns={columns} />; */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                }}
            >
                {vouchers.length &&
                    vouchers.map((voucher) => (
                        <VoucherCard
                            voucherID={voucher.voucher_id}
                            onClick={() => openModal(voucher.voucher_id)}
                        />
                    ))}
            </div>
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
                <p>{voucher?.name}</p>
                <p>{voucher?.description}</p>
                <p>{voucher?.organization}</p>
            </Modal>
        </div>
    );
};

export default Home;
