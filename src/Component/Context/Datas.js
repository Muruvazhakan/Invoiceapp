import companyperson from "../../Image/companyf.png";
import invocie from "../../Image/invoicef.png";
import estimate from "../../Image/estimates.png";
import stocks from "../../Image/stocks.png";
// import estimate from '../../Image/estimates.png';
import salesf from "../../Image/salesf.png";
import profitsf from "../../Image/profitsf.png";
import { MdLogin, MdLockReset } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
export const navigationbarcontent = [
  {
    screenname: "Home",
    links: "/",
    altname: "/",
    displays: true,
    tier: ["silver", "gold", "platinum"],
  },
  {
    screenname: "Company Detail",
    links: "/yourdetail",
    altname: "yourdetail",
    displays: true,
    image: companyperson,
    tier: ["silver", "gold", "platinum"],
  },
  // {
  //     screenname: 'Generate Invocie',
  //     links: '/geninvoice',
  //     altname: 'geninvoice',
  //     displays: true,
  //     image: invocie
  // },
  // {
  //     screenname: 'Generate Estimate',
  //     links: '/genestimate',
  //     altname: 'genestimate',
  //     displays: true,
  //     image: estimation
  // },
  {
    screenname: "Invoice",
    links: "/invoice",
    altname: "invoice",
    displays: true,
    image: invocie,
    tier: ["gold", "platinum"],
  },
  {
    screenname: "Estimates",
    links: "/estimates",
    altname: "estimates",
    displays: true,
    image: estimate,
    tier: ["silver", "gold", "platinum"],
  },
  {
    screenname: "Stocks",
    links: "/stocks",
    altname: "stocks",
    displays: true,
    image: stocks,
    tier: ["platinum"],
  },
  {
    screenname: "Profits",
    links: "/profits",
    altname: "profits",
    displays: true,
    image: profitsf,
    tier: ["platinum"],
  },
];

export const userLogin = [
  {
    screenname: "Login",
    links: "/",
    altname: "/",
    displays: true,
    iconname: MdLogin,
  },
  {
    screenname: "Siginup",
    links: "/siginup",
    altname: "signup",
    displays: true,
    iconname: RiUserAddLine,
  },
  {
    screenname: "Rest Password",
    links: "/passwordreset",
    altname: "passwordreset",
    displays: true,
    iconname: MdLockReset,
  },
];

export const userLoginname = [
  {
    userid: "12",
    username: "JR modular",
    userPass: "jrmodular123",
  },
  {
    userid: "13",
    username: "Other1",
    userPass: "jrmodular123",
  },
];
