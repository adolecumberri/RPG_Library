function uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
};


let isPercentage = (data: any) => /^(\d+|(\.\d+))(\.\d+)?%$/.test(data)

export {
    uniqueID,
    isPercentage
}