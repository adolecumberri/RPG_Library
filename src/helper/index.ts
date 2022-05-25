function uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
};

let isPercentage = (data: any) => /^(\d+|(\.\d+))(\.\d+)?%$/.test(data)

let percentageToNumber = (percentage: string) => Math.floor(parseFloat(percentage as string) / 100);

export {
    isPercentage,
    percentageToNumber,
    uniqueID,
}