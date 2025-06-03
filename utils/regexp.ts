// 한글(완성형+자음+모음), 영문, 숫자, 언더스코어만 허용하는 정규식
export const isValidName = (tag: string): boolean => {
  const regex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_]+$/;
  return regex.test(tag);
};
