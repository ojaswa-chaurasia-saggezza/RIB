export function convertTZ(date, tzString= 'Asia/Kolkata') {
    if (!date) return date;
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}


export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',

});
