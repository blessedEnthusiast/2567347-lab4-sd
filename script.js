function countryDetails() {
    let country = document.getElementById("country").value;
    //console.log(country)
    fetch("https://restcountries.com/v3.1/name/" + country)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (country === "") {
                throw new Error("Please enter the country")
            }
            //console.log(data);
            console.log("Capital: ", data[0].capital[0]);
            console.log("Population: ", data[0].population);
            console.log("Region: ", data[0].region);
            console.log("Flag: ", data[0].flag.png)
            // if (data.borders) {
            //     data.borders.array.forEach(border => {
            //         console.log("Border: ", border)
            //         console.log("Bordering Countries: ", data.name);
            //         console.log(data.flag.svg)
            //     });
            // }
            // else {
            //     console.log("There are no neighbouring countries")
            // }
            //let countryData = data[0];
            let countryInfo = document.getElementById("country-info");
            countryInfo.innerHTML = `
                <h2>${countryData.name.common}</h2>
                <p><strong>Capital:</strong> ${data[0].capital[0]}</p>
                <p><strong>Population:</strong> ${data[0].population}</p>
                <p><strong>Region:</strong> ${countryData.region}</p>
                <img src="${countryData.flags.svg}" alt="Flag of ${countryData.name.common}" width="200">
            `;
        })
        .catch(error => console.error("Error fetching json data", error));
}
