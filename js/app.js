const loadSearchResult = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data.data));
};

const displayResults = data => {
    const displaySection = document.getElementById('phone-display-section');
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card shadow">
                <img src="${phone.image}" class="card-img-top img-fluid p-4" alt="...">
                <div class="card-body p-4">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn btn-primary">Details</button>
            </div>
        `;
        displaySection.appendChild(div);
    });
};

