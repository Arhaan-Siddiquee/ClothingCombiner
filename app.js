let upperWear = [];
let bottomWear = [];
let combinations = [];

function addUpper() {
    const upperInput = document.getElementById('upperInput');
    const file = upperInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        upperWear.push(reader.result);
        updateCombinations();
    }

    if (file) {
        reader.readAsDataURL(file);
    }

    upperInput.value = '';
}

function addBottom() {
    const bottomInput = document.getElementById('bottomInput');
    const file = bottomInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        bottomWear.push(reader.result);
        updateCombinations();
    }

    if (file) {
        reader.readAsDataURL(file);
    }

    bottomInput.value = '';
}

function updateCombinations() {
    combinations = [];
    upperWear.forEach(upper => {
        bottomWear.forEach(bottom => {
            combinations.push({ upper, bottom });
        });
    });
    renderCombinations();
}

function renderCombinations() {
    const combinationsList = document.getElementById('combinationsList');
    combinationsList.innerHTML = '';
    combinations.forEach((combo, index) => {
        const listItem = document.createElement('li');
        
        const upperImg = document.createElement('img');
        upperImg.src = combo.upper;
        upperImg.alt = 'Upper Wear';
        upperImg.width = 50;
        upperImg.height = 50;

        const bottomImg = document.createElement('img');
        bottomImg.src = combo.bottom;
        bottomImg.alt = 'Bottom Wear';
        bottomImg.width = 50;
        bottomImg.height = 50;

        listItem.appendChild(upperImg);
        listItem.appendChild(document.createTextNode(' + '));
        listItem.appendChild(bottomImg);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            combinations.splice(index, 1);
            renderCombinations();
        };

        listItem.appendChild(deleteButton);
        combinationsList.appendChild(listItem);
    });
}

function getDailyRecommendation() {
    if (combinations.length === 0) {
        document.getElementById('recommendationResult').textContent = 'No combinations available';
        return;
    }
    const randomIndex = Math.floor(Math.random() * combinations.length);
    const combo = combinations[randomIndex];
    showRecommendation(combo);
}

function getWeeklyRecommendation() {
    if (combinations.length < 7) {
        document.getElementById('recommendationResult').textContent = 'Not enough combinations available';
        return;
    }
    const weekCombo = [];
    while (weekCombo.length < 7) {
        const randomIndex = Math.floor(Math.random() * combinations.length);
        const combo = combinations[randomIndex];
        if (!weekCombo.includes(combo)) {
            weekCombo.push(combo);
        }
    }
    document.getElementById('recommendationResult').innerHTML = weekCombo.map((combo, index) => `
        <div>
            <h4>Day ${index + 1}</h4>
            <img src="${combo.upper}" alt="Upper Wear" width="50" height="50">
            <img src="${combo.bottom}" alt="Bottom Wear" width="50" height="50">
        </div>
    `).join('');
}

function showRecommendation(combo) {
    document.getElementById('recommendationResult').innerHTML = `
        <img src="${combo.upper}" alt="Upper Wear" width="50" height="50">
        <img src="${combo.bottom}" alt="Bottom Wear" width="50" height="50">
    `;
}
