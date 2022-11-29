interface loginModel {
  account: string;
  password: string; //md5
}
interface registerModel {
  account: string;
  password: string; //md5
}
export { loginModel, registerModel };
