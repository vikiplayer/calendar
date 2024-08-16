const currentDate = document.querySelector(".thismonth");
const dates = document.querySelector(".date");
const pre = document.getElementById("per");
const nxt = document.getElementById("nxt");
let date = new Date();
let thisYear = date.getFullYear();
let thisMonth = date.getMonth();

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const runCal = () => {
    let firstDayIndex = new Date(thisYear, thisMonth, 1).getDay();
    let lastDate = new Date(thisYear, thisMonth + 1, 0).getDate();
    let ldlm = new Date(thisYear, thisMonth, 0).getDate();
    let liTag = "";

    // Adding the days from the previous month
    for (let i = ldlm - firstDayIndex + 1; i <= ldlm; i++) {
        liTag += `<li class="non-active">${i}</li>`;
    }

    // Adding the days of the current month
    for (let i = 1; i <= lastDate; i++) {  
        // Check if the current day is today's date and if the month and year match
        let today = i === date.getDate() && thisMonth === new Date().getMonth() && thisYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${today}">${i}</li>`;      
    }  
      

    let nextDays = 7 - ((firstDayIndex + lastDate) % 7);
    if (nextDays < 7) {  // Only add these if we need to fill the last row
        for (let i = 1; i <= nextDays; i++) {
            liTag += `<li class="non-active">${i}</li>`;
        }
    }

    
    currentDate.textContent = `${month[thisMonth]} ${thisYear}`;
    dates.innerHTML = liTag;

    // Add event listener to each date to print the selected date
    const dateItems = dates.querySelectorAll("li:not(.non-active)");
    dateItems.forEach(item => {
        item.addEventListener("click", () => {
            let selectedDay = item.textContent;
            console.log(`Selected Date: ${selectedDay} ${month[thisMonth]} ${thisYear}`);
        });
    });
}

runCal();

pre.addEventListener("click",() =>{
    thisMonth--;

    // Handle the case when the month goes below January
    if (thisMonth < 0) {
        thisMonth = 11;  // Set to December
        thisYear--;      // Decrement the year
    }
    
    runCal();
});

nxt.addEventListener("click",() =>{
    thisMonth++;

    // Handle the case when the month goes above December
    if (thisMonth > 11) {
        thisMonth = 0;   // Set to January
        thisYear++;      // Increment the year
    }
    
    runCal();
});