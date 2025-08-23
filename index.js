fetchJsonData("daily");

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