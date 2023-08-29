
import { BANKICON, CALENDARICON, DEBITCARDICON, MODIFYICON, QMARKICON } from "./icons";
import { formatDate, formatToMoney, toDollarNaira } from "../utils/formatters";
import { QTYASSETIMG, SUPSELECTIMG, BETTERPERFORMANCEIMG } from "./images";
import { COLORS } from "./theme";

export const BASEURL = 'https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/';


export const SCREENS = [
    {
        icon: QTYASSETIMG,
        title: 'Quality assets',
        subText: 'Rise invests your money into the best dollar investments around the world.',
        bg: '#FEFAF7',
        color: COLORS['orange-001']
    },
    {
        icon: SUPSELECTIMG,
        title: 'Superior Selection',
        subText: 'Our expert team and intelligent algorithms select assets that beat the markets. ',
        bg: '#FDF4F9',
        color: COLORS['indigo-001']
    },
    {
        icon: BETTERPERFORMANCEIMG,
        title: 'Better Performance',
        subText: 'You earn more returns, achieve more of your financial goals and protect your money from devaluation.',
        bg: '#F6FFFE',
        color: COLORS['teal-001']
    }
]

const TODAY = new Date()
export const EIGHTEENYEARSAGO = new Date(TODAY.getFullYear() - 18, TODAY.getMonth(), TODAY.getDate());
export const AYEARFROMNOW = new Date(TODAY).setFullYear(TODAY.getFullYear() + 1);


export const BANKACCOUNTS = [
    {
        accountNumber: '0123456789',
        bankName: 'GTBank PLC',
        accountName: 'Bosun Olanrewaju'
    },
    {
        accountNumber: '6145785229',
        bankName: 'Fidelity Bank',
        accountName: 'Bosun Olanrewaju'
    },
]


export const DATERANGE = [
    '1M',
    '3M',
    '6M',
    'All'
]

export const BREAKDOWN = (plan: IPlan, rate?: string) => [
    {
        title: 'Total earnings',
        value: `$${formatToMoney(plan.total_returns.toString())}`
    },
    {
        title: 'Deposit value',
        value: `$${formatToMoney(plan.invested_amount.toString())}`
    },
    {
        title: `Balance in Naira (*₦${rate})`,
        value: `₦${rate ? toDollarNaira({ type: 'naira', rate, target_amount: plan.target_amount.toString() }) : 0}`
    },
    {
        title: 'Plan created on',
        value: `${formatDate(new Date(plan.created_at))}`
    },
    {
        title: 'Maturity date',
        value: `${formatDate(new Date(plan.maturity_date))}`

    },

]


export const INVESTMENTDETAILS = [
    {
        title: 'Give us a few details',
        subText: 'Tell us what you want to achieve and we will help you get there',
        icon: QMARKICON
    },
    {
        title: 'Turn on auto-invest',
        subText: 'The easiest way to get your investment working for you is to fund to periodically. ',
        icon: CALENDARICON
    },
    {
        title: 'Modify as you progress',
        subText: 'You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more.',
        icon: MODIFYICON
    }
]



export const WALLETTRANSACTIONS = [
    {
        title: 'Naira Bank Transfer',
        timeline: '15 mins',
        rate: '$1 - ₦490',
        fee: '1.5%',
        icon: BANKICON
    },
    {
        title: 'Naira Debit card',
        timeline: '15 mins',
        rate: '$1 - ₦490',
        fee: '1.5%',
        icon: DEBITCARDICON
    },
    {
        title: 'Naira Bank Transfer',
        timeline: '15 mins',
        rate: '$1 - ₦490',
        fee: '1.5%',
        icon: BANKICON
    },
    {
        title: 'Naira Bank Transfer',
        timeline: '15 mins',
        rate: '$1 - ₦490',
        fee: '1.5%',
        icon: BANKICON
    },
    {
        title: 'Naira Debit card',
        timeline: '15 mins',
        rate: '$1 - ₦490',
        fee: '1.5%',
        icon: DEBITCARDICON
    },
    {
        title: 'Naira Bank Transfer',
        timeline: '15 mins',
        rate: '$1 - ₦490',
        fee: '1.5%',
        icon: BANKICON
    },
]

export const ABOUTEXCHANGERATES = (rate: { buy_rate: number; sell_rate: number }) => [
    {
        title: 'USD Buy Rate',
        subText: 'We buy US dollars at this rate',
        amount: `₦${rate ? formatToMoney(rate.buy_rate.toString()) : 0}`
    },
    {
        title: 'USD Sell Rate',
        subText: 'The current value of your investments in Naira',
        amount: `₦${rate ? formatToMoney(rate.sell_rate.toString()) : 0}`
    },
]


export interface IUser {
    email_address: string;
    first_name: string;
    id: string;
    last_name: string;
    total_balance: number;
    total_returns?: number;
    username: string
}

export interface IPlan {
    created_at: string;
    id: string;
    invested_amount: number;
    maturity_date: string;
    plan_name: string;
    returns: any[];
    target_amount: number;
    total_returns: 0;
    user_id: string
}
export const Greeting = () => {
    const time = new Date().getHours();
    let greeting;
    if (time < 12) {
        greeting = "Good Morning ☀";
    } else if (time < 16) {
        greeting = "Good Afternoon 🌞";
    } else {
        greeting = "Good Evening 🌙";
    }

    return greeting;
};