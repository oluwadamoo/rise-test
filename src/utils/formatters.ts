export const formatToMoney = (value?: string) => {

    if (value) {
        const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));

        const formatted = numericValue.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formatted;
    } else {
        return ''
    }

};

export const formatDate = (date: Date) => {
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getMonthsDifference = (date1: Date, date2: Date) => {
    const diffInMonths = (date2.getFullYear() - date1.getFullYear()) * 12 +
        date2.getMonth() - date1.getMonth();

    return diffInMonths;
}

interface ToDollarNairaProps {
    type: 'dollar' | 'naira',
    rate: string;
    target_amount: string;
}
export const toDollarNaira = ({ type, rate, target_amount }: ToDollarNairaProps) => {
    if (type == 'dollar') {
        return formatToMoney((parseFloat(target_amount) / parseFloat(rate)).toString())
    } else {
        return formatToMoney((parseFloat(target_amount) * parseFloat(rate)).toString())
    }

}
