// Types for APIs

interface Token {
    access: string;
    refresh: string;
}

interface Voucher {
    id: string;
    posted_date: string;
    available_date: string;
    expiry_date: string;
    name: string;
    organization: string;
    voucher_type: string;
    description: string;
    counter: number;
    image: string;
    code_uploaded: boolean;
}

interface CodeByEmail {
    id: number;
    voucher_id: number;
    code_id: number;
    email_id: number;
}
