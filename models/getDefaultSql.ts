import * as path from "path";
import fs from "fs";

//실제 sql 파일을 불러오는 부분
export const getDefaultSql = fs.readFileSync(
  path.join(__dirname, "../sql", "getDefaultSql.sql"),
  "utf8"
);
