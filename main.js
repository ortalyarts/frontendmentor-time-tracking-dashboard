

async function fetchData(){
    try{
        const response = await fetch(`https://raw.githubusercontent.com/ortalyarts/frontendmentor-time-tracking-dashboard/main/data.json`)

        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();

        // ==== if json data ok:

        const replaceValue = (category, timeRange) => {
            const htmlCurrent = document.querySelector(`section[aria-label="${category}"] .current span`);
            htmlCurrent.innerText = data.find(({ title }) => title === category).timeframes[timeRange].current;
    
            const htmlLast = document.querySelector(`section[aria-label="${category}"] .last span`);
            htmlLast.innerText = data.find(({ title }) => title === category).timeframes[timeRange].previous;
        }

        const categories = ["Work", "Play", "Study", "Exercise", "Social", "Self Care"];

        // Initial rendering of the default values on page load
        categories.forEach((item) => {
            replaceValue(item, "weekly");
        })
        
        // The above forEach replaces this code:
        // replaceValue("Work", "weekly");
        // replaceValue("Play", "weekly");
        // replaceValue("Study", "weekly");
        // replaceValue("Exercise", "weekly");
        // replaceValue("Social", "weekly");
        // replaceValue("Self Care", "weekly");
    
        const radioDaily = document.querySelector('#daily');
        const radioWeekly = document.querySelector('#weekly');
        const radioMonthly = document.querySelector('#monthly');
    
        radioDaily.addEventListener('click', ()=>{
            categories.forEach((item) => {
                replaceValue(item, "daily");
            })
        })
        radioWeekly.addEventListener('click', ()=>{
            categories.forEach((item) => {
                replaceValue(item, "weekly");
            })
        })
        radioMonthly.addEventListener('click', ()=>{
            categories.forEach((item) => {
                replaceValue(item, "monthly");
            })
        })
        // ======

    }
    catch(error){
        console.log(error);
    }
}

fetchData();
