import companyperson from '../../Image/companydetails.png';
import invocie from '../../Image/invoice.png';
import estimate from '../../Image/estimates.png';
import stocks from '../../Image/stocks.png';

export const navigationbarcontent = [
    {
        screenname: 'Home',
        links: '/',
        altname: '/',
        displays: true
    },
    {
        screenname: 'Company Detail',
        links: '/yourdetail',
        altname: 'yourdetail',
        displays: true,
        image: companyperson
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
        screenname: 'Invoice',
        links: '/invoice',
        altname: 'invoice',
        displays: true,
        image: invocie
    },
    {
        screenname: 'Estimates',
        links: '/estimates',
        altname: 'estimates',
        displays: true,
        image: estimate
    },
    {
        screenname: 'Stocks',
        links: '/stocks',
        altname: 'stocks',
        displays: true,
        image: stocks
    },
];

export const userLogin = [
    {
        screenname: 'Login',
        links: '/',
        altname: '/',
        displays: true
    },
    {
        screenname: 'Siginup',
        links: '/siginup',
        altname: 'signup',
        displays: true
    },
]

export const userLoginname = [
    {
        userid:'12',
        username: 'JR modular',
        userPass: 'jrmodular123'
    },
    {
        userid:'13',
        username: 'Other1',
        userPass: 'jrmodular123'
    },
]