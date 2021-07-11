import React, { useState, useEffect, useLayoutEffect } from "react"
import { Skeleton, SkeletonText } from "@chakra-ui/react"

import usePrevious from "hooks/usePrevious"
import { dateToString } from "utils/date"

import { Modal, ModalProps, Heading, Text } from "@commitUI/index"

import styles from "./VoucherModal.module.css"

type Props = Omit<ModalProps, "children"> & {
  voucher?: Voucher
  isValidating: boolean
}

const VoucherModal = ({ voucher, isOpen, onClose, isValidating }: Props) => {
  const currVoucher = voucher?.id
  const prevVoucher = usePrevious(currVoucher)
  const [loading, setLoading] = useState(
    isValidating || prevVoucher !== currVoucher
  )

  // VoucherModal does not unmount when we close it, hence the loading state is not reset on each open
  // Hence we have to use useLayoutEffect to "reset" this component on every open
  useLayoutEffect(() => {
    if (prevVoucher !== currVoucher) {
      setLoading(isValidating)
    }
  }, [currVoucher, prevVoucher, isValidating])

  useEffect(() => {
    if (!isValidating && loading) {
      setLoading(false)
    }
  }, [isValidating, loading])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
      isCentered
    >
      {loading ? (
        <VoucherModalSkeleton />
      ) : (
        <>
          <Heading>{voucher?.name}</Heading>

          <div className={styles.subheader}>
            <Text
              className={styles.provider}
            >{`Provided by ${voucher?.organization}`}</Text>
            <Text>{`Promotion ends on ${dateToString(
              voucher?.expiry_date || ""
            )}`}</Text>
          </div>

          <img src={voucher?.image} className={styles.img} alt="Voucher" />

          <Text
            className={styles.description}
          >{`${voucher?.description}`}</Text>

          <hr />

          <Text className={styles.footer}>Flash this eVoucher to redeem.</Text>
        </>
      )}
    </Modal>
  )
}

const VoucherModalSkeleton = () => {
  return (
    <>
      <Skeleton fadeDuration={2}>
        <Heading>Blablabla</Heading>
      </Skeleton>

      <div className={styles.subheader}>
        <SkeletonText mt="2" noOfLines={2} spacing="2" width="200px" />
      </div>

      <Skeleton height="160px" />

      <SkeletonText
        mt="2"
        noOfLines={3}
        spacing="2"
        className={styles.description}
      />

      <hr />

      <SkeletonText
        mt="2"
        noOfLines={1}
        spacing="2"
        className={styles.footer}
      />
    </>
  )
}

export default VoucherModal
