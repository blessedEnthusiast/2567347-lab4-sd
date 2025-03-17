function countryDetails() {
    let country = document.getElementById("country").value.trim();

    if (country === "") {
        alert("Please enter a country name.");
        return;
    }

    fetch("https://restcountries.com/v3.1/name/" + country)
        .then(response => response.json())
        .then(data => {
            if (!data || data.status === 404) {
                throw new Error("Country not found.");
            }

            let countryData = data[0];

            console.log("Capital: ", countryData.capital ? countryData.capital[0] : "N/A");
            console.log("Population: ", countryData.population);
            console.log("Region: ", countryData.region);
            console.log("Flag: ", countryData.flags.svg);

            let countryInfo = document.getElementById("country-info");
            countryInfo.innerHTML = ` 
            <h2>${countryData.name.common}</h2>
            <ul style="list-style-type:square"> 
                <li><p><strong>Capital:</strong> ${countryData.capital ? countryData.capital[0] : "N/A"}</p></li>
                <li><p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p></li>
                <li><p><strong>Region:</strong> ${countryData.region}</p></li>
                <li><p><strong>Flag:</strong> </p></li>
                <img src="${countryData.flags.svg}" alt="Flag of ${countryData.name.common}" width="500">
            </ul>
            `;

            // Display bordering countries
            let borderingCountries = document.getElementById("bordering-countries");
            if (countryData.borders && countryData.borders.length > 0) {
                let bordersHTML = `<p><strong>Bordering Countries:</strong></p><ul style="list-style-type:square;">`;

                // Fetch details for each bordering country
                Promise.all(
                    countryData.borders.map(borderCode =>
                        fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                            .then(response => response.json())
                    )
                ).then(bordersData => {
                    bordersData.forEach(borderCountryData => {
                        let border = borderCountryData[0]; // Get the first result
                        bordersHTML += `
                            <li>${border.name.common}</li>
                            <img src="${border.flags.svg}" alt="Flag of ${border.name.common}" width="350"><br> <br>
                        `;
                    });

                    bordersHTML += `</ul>`;
                    borderingCountries.innerHTML = bordersHTML;
                }).catch(error => {
                    console.error("Error fetching bordering countries:", error);
                    borderingCountries.innerHTML = `<p style="color:red;">Error fetching bordering countries.</p>`;
                });

            } else {
                borderingCountries.innerHTML = `<p><strong>Bordering Countries:</strong> None</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data:", error);
            document.getElementById("country-info").innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}
