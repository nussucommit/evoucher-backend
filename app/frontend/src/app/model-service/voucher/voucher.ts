export class Voucher {
    id: string;
    voucher_id: string;
    posted_date: Date;
    available_date: Date;
    expiry_date: Date;
    name: string;
    description: string;
    claims_left: number;
    image: string;
}