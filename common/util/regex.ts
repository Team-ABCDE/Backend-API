//정규식
export const idRegex = /^[a-z0-9]{11,17}$/i;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{20}$/i;
export const emailRegex =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{2,12}$/i;
export const birthRegex = /^[0-9]{6}$/i;
export const phoneRegex = /^[0-9]{11}$/i;
export const genderRegex = /^[남]|[여]{1}$/i;
