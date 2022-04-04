import { Service } from "typedi";
import * as fs from "fs";
import * as path from "path";
import { Accounting } from "./accounting.interface";

@Service()
export class AccountingService {
  async fetchAll(): Promise<Accounting> {
    const filePath = path.join(__dirname, "data.json");
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }

  async save(file: any) {
    const filePath = path.join(__dirname, "data.json");
    fs.writeFile(filePath, file.buffer, (err) => {
        console.log('error: ', err);
    });

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }
}
