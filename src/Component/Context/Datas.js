import companyperson from '../../Image/companyperson.png';
import invocie from '../../Image/invoice.png';
import estimation from '../../Image/estimation.png';

export const isbackendconnect = "Yes";


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
    {
        screenname: 'Generate Invocie',
        links: '/geninvoice',
        altname: 'geninvoice',
        displays: true,
        image: invocie
    },
    {
        screenname: 'Generate Estimate',
        links: '/genestimate',
        altname: 'genestimate',
        displays: true,
        image: estimation
    },

];

export const userLogin = [
    {
        screenname: 'Login',
        links: '/login',
        altname: 'login',
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
        username: 'JR modular',
        userPass: 'jrmodular123'
    },
    {
        username: 'Other1',
        userPass: 'jrmodular123'
    },
]