export const required= value=>{
    if(value===undefined||value===null||value.length===0){
        return "Field is required"
    }
    return true
}

// export function dateValidation(value) {
//     const currentDate = new Date()
//     const givenDate = new Date(value)
//     return givenDate > currentDate || 'Incorrect Date'
// }

// export const requiredV2 = (value) =>
//     (+value >= 0 && value !== '') || "You can't leave this field empty"


// export function requiredPercentage(message = "Percentage is not accurate!") {
//     return (v) => !!v && v > 0 && v <= 100 || message
// }


// export function requiredArray(message = "You can't leave this field empty") {
//     return (v) => !!v && v.length > 0 || message
// }

// export function trialValidator() {
//     return (v) => (v === true || v === false) || "You can't leave this field empty"
// }

export const email= value =>{
    if (! ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) )) {
        var message = ''
        return  message =  "This email is not valid"
    }
    return true
}

export const string = ()=>{
    return true
}
// export function answerValidator(type) {
//     if (type === 'bool') {
//         return (v) => (v && (v === 'true' || v === 'false')) || 'Answer should be the true or false.';
//     } else {
//         return (v) => (v && (!/^[a-zA-Z]+$/.test(v) || v.trim().length === 1)) || 'Answer should be the between A and Z.';
//     }
// }

// export const passageQuestionsValidator = (v, list) => {
//     let count = 0
//     for (const item of list) {
//         if (item.question === v.question) {
//             count++
//         }
//     }

//     return count > 1 ? 'Question is already selected.' : true
// }

