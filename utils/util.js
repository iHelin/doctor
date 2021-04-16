function getCurrentDay() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year.toString() + formatNumber(month) + formatNumber(day);
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
}

module.exports = {
    getCurrentDay: getCurrentDay,
};
