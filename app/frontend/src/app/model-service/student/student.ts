import { Faculty } from "../faculty/faculty";
import { Organization } from "../organization/organization";
import { Voucher } from "../voucher/voucher";

export class Student {
    nusnet_id: string;
    name: string;
    year: number;
    faculties: Faculty;
    organizations: Organization;
    vouchers: Voucher;
}