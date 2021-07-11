import React, { useState, useEffect } from "react"

import useAuth from "hooks/useAuth"
import { logout } from "api/auth"
import { getToken } from "utils/auth"
import useModal from "hooks/useModal"
import { useVoucher, useVouchers } from "api/voucher"

import { Button } from "@commitUI/index"
import VoucherCard, { VoucherCardSkeleton } from "components/VoucherCard"
import VoucherModal from "components/VoucherModal"

const Home = () => {
  const { logout: localLogout } = useAuth()
  const { isOpen, onClose, onOpen } = useModal()
  const { data: vouchers } = useVouchers("e0412934@u.nus.edu") // placeholder email
  const [openVoucher, setOpenVoucher] = useState<number>(0)
  const { data: voucher, isValidating } = useVoucher(openVoucher)
  const arr = React.useMemo(() => [...Array(20)], [])

  //   useEffect(() => {
  //     if (openVoucher === 0) revalidate()
  //   })

  const openModal = (voucherID: number) => {
    if (voucherID !== openVoucher) {
      setOpenVoucher(voucherID)
    }
    onOpen()
  }

  return (
    <>
      <div style={{ backgroundColor: "#fff", margin: 32 }}>
        <h1>Home</h1>
        {/* <Table dataSource={dataSource} columns={columns} />; */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {vouchers?.data
            ? vouchers.data?.map((voucher) => (
                <VoucherCard
                  voucherID={voucher.voucher_id}
                  onClick={() => openModal(voucher.voucher_id)}
                />
              ))
            : arr.map(() => <VoucherCardSkeleton />)}
        </div>
        <Button onClick={onOpen}>Open Modal</Button>
        <Button
          onClick={() => {
            const token = getToken()
            console.log(token)
            logout({ refresh_token: token!.refresh })
            localLogout()
          }}
        >
          Log out
        </Button>
      </div>

      <VoucherModal
        onClose={onClose}
        isOpen={isOpen}
        voucher={voucher}
        isValidating={isValidating}
      />
    </>
  )
}

export default Home
