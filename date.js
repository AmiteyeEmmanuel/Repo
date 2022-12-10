// exports.getDate = function() {

//     const today = new Date();

//     const options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     }

//     return today.toLocaleString("en-US", options);

// }

// exports.getDay = function() {
//     const date = new Date().getHours()

//     const opt = {
//         day: date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night'
//     }
//     return JSON.stringify(opt.day);
    // console.log(opt.day);

// }


// exports.getHours = function() {

//     const date = new Date().getHours();

//     const option = {
//         hour: "numeric",
//         time: "long"
//     }

// return date.toLocaleString("en-US", option);
// }

// // exports.getUTCDay = function() {

// // //     const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // //     const d = new Date();
// // //     let day = weekday[d.getUTCDay()];

// // //     return d.toLocaleDateString("en-Us", day);
// }