const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";
  //   display 20 phones max
  const showAllButton = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAllButton.classList.remove("d-none");
  } else {
    showAllButton.classList.add("d-none");
  }
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
                        <img src="${phone.image}" class="card-img-top p-4" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Name: ${phone.phone_name} </h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="displayDetails('${phone.slug}')"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                        </div>
        </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleLoader(false);
};

const processSearch = (dataLimit) => {
  toggleLoader(true);
  const searchField = document.getElementById("search-field");
  const searchFieldValue = searchField.value;
  loadPhones(searchFieldValue, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
    processSearch(10);
});

document.getElementById('search-field').addEventListener('keyup', function(key){
    if(key.key === 'Enter'){
        processSearch(10);
    }
})

const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader-section");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document
  .getElementById("btn-show-all")
  .addEventListener("click", function () {
    processSearch();
  });

const displayDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
};

const displayPhoneDetails = phone =>{
  console.log(phone)
  const modalTitle = document.getElementById('phoneDetailsModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDiv = document.getElementById('phone-details');
  phoneDiv.innerHTML = `
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
  <p> ChipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No ChipSet Information Found'}  
  Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}
  <p> Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}
  `
}
// loadPhones('apple');
