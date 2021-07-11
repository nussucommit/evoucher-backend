import React from "react"
import cx from "classnames"
import { Skeleton, SkeletonText } from "@chakra-ui/react"

import { useVoucher } from "api/voucher"

import { Card, CardProps, Text, Heading } from "@commitUI/index"

import styles from "./VoucherCard.module.css"

export interface Props extends CardProps {
  voucherID: number
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const VoucherCard = ({
  voucherID,
  style,
  children,
  onClick,
}: Props): JSX.Element => {
  const { data: voucher } = useVoucher(voucherID)
  const isLoading = !voucher

  return isLoading ? (
    <VoucherCardSkeleton />
  ) : (
    <Card className={styles.container} onClick={onClick}>
      <>
        <div style={{ width: "100%" }}>
          <img
            src={voucher && voucher.image}
            className={styles.img}
            alt="Voucher"
          />
        </div>

        <div className={styles.textContainer}>
          <Heading>{voucher?.name}</Heading>

          <div className={styles.description}>
            <Text>{`Provided by ${voucher?.organization}`}</Text>
            <Text>{`Promotion ends on ${voucher?.expiry_date}`}</Text>
          </div>

          <Text>Flash this eVoucher to redeem</Text>
        </div>
      </>
    </Card>
  )
}

export const VoucherCardSkeleton = () => {
  return (
    <Card className={styles.container}>
      <div style={{ width: "100%" }}>
        <Skeleton height="200px" />
      </div>

      <div className={styles.textContainer}>
        <Skeleton
          width="180px"
          height="30px"
          className={styles.headingSkeleton}
        />

        <div className={styles.descriptionSkeletion}>
          <SkeletonText mt="2" noOfLines={3} spacing="3" width="200px" />
        </div>

        <SkeletonText
          mt="2"
          noOfLines={1}
          spacing="2"
          width="200px"
          height="16px"
        />
      </div>
    </Card>
  )
}

export default VoucherCard
