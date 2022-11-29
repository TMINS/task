// if(process.env)
const baseURL = "/api";
export default {
  baseURL,
  xssOptions: {
    whiteList: {
      span: ["class"],
    },
  },
};
