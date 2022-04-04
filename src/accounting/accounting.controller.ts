import { Service } from "typedi";
import {
  JsonController,
  Get,
  Post,
  HttpCode,
  UploadedFile,
} from "routing-controllers";
import { AccountingService } from "./accounting.service";
import { fileUploadOptions } from "./accounting.validators";

@Service()
@JsonController("/v1/accounting")
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get("/")
  async index(): Promise<any> {
    const data = this.accountingService.fetchAll();
    return data;
  }

  @HttpCode(201)
  @Post("/")
  async store(
    @UploadedFile("file", { options: fileUploadOptions }) file: any
  ): Promise<any> {
    const data = this.accountingService.save(file);
    // console.log("Files: ", request.body.files);
    return data;
  }
}
