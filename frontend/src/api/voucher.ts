import useRequest, { Config } from "./swr"
import request from "./request"

export const useVouchers = (
  email: string,
  config?: Config<{ data: CodeByEmail[] }>
) =>
  useRequest<{ data: CodeByEmail[] }>(
    { method: "GET", url: `voucher/${email}/getCodeByEmails/` },
    config
  )

export const useVoucher = (voucherID: number, config?: Config<Voucher>) =>
  useRequest<Voucher>({ method: "GET", url: `voucher/${voucherID}` }, config)
