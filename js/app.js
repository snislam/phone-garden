// Search result display function (Arrow function);
const loadSearchResult = () => {
    const inputField = document.getElementById('input-field');
    const searchValue = inputField.value;
    const searchText = searchValue.toLowerCase();
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data.data));
};

const displayResults = data => {
    toggleSpinner('block');
    const displaySection = document.getElementById('phone-display-section');
    displaySection.textContent = '';
    if (data.length == 0) {
        document.getElementById('no-result').style.display = 'block';
        document.getElementById('details-showcase').style.display = 'none';
        toggleSpinner('none');
    } else {
        document.getElementById('no-result').style.display = 'none';
        document.getElementById('details-showcase').style.display = 'block';
        document.getElementById('details-showcase').textContent = '';
        data.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card shadow">
                <img src="${phone.image}" class="card-img-top img-fluid p-4" alt="...">
                <div class="card-body p-4">
                    <p class="card-text">${phone.brand}</p>
                    <h5 class="card-title mb-3">${phone.phone_name}</h5>
                    <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-primary" > Details</button >
            </div >
        `;
            displaySection.appendChild(div);
        });

        toggleSpinner('none');
    }

};


// Phone details display function (arrow function);
const showPhoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
};

const displayDetails = phone => {
    const detailsShowcase = document.getElementById('details-showcase');
    detailsShowcase.innerHTML = `
        <div class="card mb-3 w-75 mx-auto my-4 p-4">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${phone.image}" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"><b>Name:</b> ${phone.name}</h5>
                <small>Brand: ${phone.brand}</small>
                <hr>
                <h4 class="font-weight-bold">Features</h4>
                <hr>
                <p class="card-text"><b>ChipSet:</b> ${phone.mainFeatures.chipSet}</p>
                <p class="card-text"><b>Display Size:</b> ${phone.mainFeatures.displaySize}</p>
                <p class="card-text"><b>Memory:</b> ${phone.mainFeatures.memory}</p>
                <p class="card-text"><b>Sensors:</b> ${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}</p>
                <hr>
                <h4 class="font-weight-bold">Others</h4>
                <hr>
                <p class="card-text"><b>Bluetooth:</b> ${checkValue(phone.others?.Bluetooth)}</p>
                <p class="card-text"><b>GPS:</b> ${checkValue(phone.others?.GPS)}</p>
                <p class="card-text"><b>NFC:</b> ${checkValue(phone.others?.NFC)}</p>
                <p class="card-text"><b>Radio:</b> ${checkValue(phone.others?.Radio)}</p>
                <p class="card-text"><b>USB:</b> ${checkValue(phone.others?.USB)}</p>
                <p class="card-text"><b>WLAN:</b> ${checkValue(phone.others?.WLAN)}</p>
                <p class="card-text"><b>Release Date:</b> ${releaseDateCheck(phone.releaseDate)}</p>
              </div >
            </div >
          </div >
        </div >
    `;
};

const checkValue = value => {
    if (value != undefined) {
        return value;
    } else {
        return 'Opps! Unknown';
    }
};

const releaseDateCheck = release => {
    if (release.length === 0) {
        return 'Unknown';
    } else {
        return release;
    }
};


// Spinner add :)

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};