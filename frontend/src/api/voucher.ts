import useRequest, { Config } from "./swr";

export const useVouchers = (email: string, config?: Config<CodeByEmail[]>) =>
    useRequest<CodeByEmail[]>(
        { method: "GET", url: `voucher/e0412934@u.nus.edu/getCodeByEmails/` },
        config
    );

export const useVoucher = (voucherID: number, config?: Config<Voucher>) =>
    useRequest<Voucher>({ method: "GET", url: `voucher/${voucherID}` }, config);
