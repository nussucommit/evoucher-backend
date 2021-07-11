import React from "react";
import cx from "classnames";
import Image, { Shimmer } from "react-shimmer";

import { useVoucher } from "api/voucher";

import { Card, CardProps, Text, Heading } from "@commitUI/index";

import styles from "./VoucherCard.module.css";

export interface Props extends CardProps {
    voucherID: number;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const VoucherCard = ({
    voucherID,
    style,
    className,
    children,
    onClick,
}: Props): JSX.Element => {
    const cn = cx(styles.container, className);
    const { data: voucher } = useVoucher(voucherID);
    const isLoading = !voucher;

    return (
        <Card className={cn} onClick={onClick}>
            <div style={{ width: "100%" }}>
                {/* <Image
                    src={voucher.image}
                    fallback={<Shimmer width={600} height={600} />}
                /> */}
                {isLoading ? (
                    <Shimmer width={350} height={200} />
                ) : (
                    <img
                        src={voucher && voucher.image}
                        className={styles.img}
                    />
                )}
            </div>

            <div>
                {isLoading ? (
                    <Shimmer width={100} height={30} />
                ) : (
                    <Heading>{voucher?.name}</Heading>
                )}

                {isLoading ? (
                    <>
                        <div style={{ marginTop: 10 }}>
                            <Shimmer width={120} height={10} />
                        </div>
                        <div style={{ marginTop: 2 }}>
                            <Shimmer width={120} height={10} />
                        </div>
                        <div style={{ marginTop: 2 }}>
                            <Shimmer width={120} height={10} />
                        </div>
                    </>
                ) : (
                    <>
                        <Text>{`Provided by ${voucher?.organization}`}</Text>
                        <Text>{`Promotion ends on ${voucher?.organization}`}</Text>
                        <Text>Flash this eVoucher to redeem</Text>
                    </>
                )}
            </div>
        </Card>
    );
};

export default VoucherCard;
