fetchJsonData("weekly");

function populateDOM(data, timeframe) {
    data.forEach(item => {
        const id = item.title.replace(/\s+/g, "");
        const box = document.getElementById(`${id}`);
        const currentSpan = box.querySelector(`#current`);
        const previousSpan = box.querySelector(`#previous`);
        currentSpan.textContent = `${item.timeframes[timeframe].current}hrs`;
        previousSpan.textContent = `Last Week - ${item.timeframes[timeframe].previous}hrs`;
    });
}

async function fetchJsonData(timeframe) {
    const response = await fetch('data.json');
    if (!response.ok) {
        console.error('Oops! Something went wrong.')
    }
    else {
        const data = await response.json();
        populateDOM(data, timeframe);
    }
}

const daily = document.getElementById(`daily`);
const weekly = document.getElementById(`weekly`);
const monthly = document.getElementById(`monthly`);

daily.addEventListener('click', event => {
    fetchJsonData("daily");
    daily.classList.add('active');
    weekly.classList.remove('active');
    monthly.classList.remove('active');
})

weekly.addEventListener('click', event => {
    fetchJsonData("weekly");
    daily.classList.remove('active');
    weekly.classList.add('active');
    monthly.classList.remove('active');
})

monthly.addEventListener('click', event => {
    fetchJsonData("monthly");  
    daily.classList.remove('active');
    weekly.classList.remove('active');
    monthly.classList.add('active');
})