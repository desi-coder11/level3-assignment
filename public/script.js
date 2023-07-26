const jsonForm = document.getElementById('jsonForm');
const jsonOutputLevel2 = document.getElementById('jsonOutputLevel2');
const jsonOutputLevel3 = document.getElementById('jsonOutputLevel3');

function submitJsonForm(event) {
    event.preventDefault();

    const jsonData = document.getElementById('jsonData').value;

    try {
                const keys = jsonData.match(/"([^"]+)":/g).map(match => match.slice(1, -2));
                const duplicateKeys = keys.filter((key, index) => keys.indexOf(key) !== index);

                 if (duplicateKeys.length > 0) {

                    const level2ErrorMessage = 'Duplicate keys found in JSON level 2: ' + duplicateKeys.join(', ');
                    jsonOutputLevel2.innerHTML = `<p class="error-message">${level2ErrorMessage}</p>`;

                    const level3ErrorMessage = 'Duplicate keys found in JSON level 3: ' + duplicateKeys.join(', ');
                    jsonOutputLevel3.innerHTML = `<p class="error-message">${level3ErrorMessage}</p>`;

                    return;
                }

        const jsonObject = JSON.parse(jsonData);

        jsonOutputLevel2.textContent = JSON.stringify(jsonObject, null, 2);
        jsonOutputLevel2.innerHTML = '<pre class="successful-output">' + JSON.stringify(jsonObject, null, 2) + '</pre>';
        

        jsonOutputLevel3.innerHTML = '';
        for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                const divContainer = document.createElement('div');
                divContainer.className = 'form-row';

                const label = document.createElement('label');
                label.textContent = key;

                const input = document.createElement('input');
                input.type = 'text';
                input.value = jsonObject[key];
                input.name = key;

                divContainer.appendChild(label);
                divContainer.appendChild(input);
                jsonOutputLevel3.appendChild(divContainer);
            }
        }
    } catch (error) {
        
        // console.error("Error parsing JSON:", error.message);
        jsonOutputLevel2.innerHTML = '<p class="error-message">Invalid JSON data. Please enter valid JSON.</p>';
        jsonOutputLevel3.innerHTML = '<p class="error-message">Invalid JSON data. Please enter valid JSON.</p>';
    }
}