import { userDto } from "../../interface/userDto";
import {
  birthRegex,
  emailRegex,
  genderRegex,
  idRegex,
  nameRegex,
  phoneRegex,
  pwRegex,
} from "./regex";

export const checkUserInfo = (reqBody: userDto) => {
  //정규식 검사
  if (
    idRegex.test(reqBody.user_id) &&
    pwRegex.test(reqBody.user_pw) &&
    emailRegex.test(reqBody.email) &&
    nameRegex.test(reqBody.name) &&
    birthRegex.test(reqBody.birth) &&
    phoneRegex.test(reqBody.phone) &&
    genderRegex.test(reqBody.gender)
  ) {
    //정규식 통과
    return true;
  } else {
    //정규식 불통
    return false;
  }
};
