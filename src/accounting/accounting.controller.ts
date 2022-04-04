import { Service } from "typedi";
import { JsonController, Get } from "routing-controllers";
import { AccountingService } from './accounting.service'

@Service()
@JsonController('/api/v1/accounting')
export class AccountingController {
    constructor(private accountingService: AccountingService) {}

    @Get('/')
    async index(): Promise<any> {
        const data = this.accountingService.fetchAll()
        return data
    }
}