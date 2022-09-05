const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");

const title = document.getElementById("title");
const container = document.querySelector('.container');


async function getSystem() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system);

    if (response.status != 200) {
        showInput(response.status)
        return null
    }

    return await response.json()
}

async function renderTitle() {
    let sysObject = await getSystem();
    
    let name
    if(sysObject.name != null) {
        name = sysObject.name;
    } else {
        name = system;
    }
    
    let colour
    if(sysObject.color != null) {
        colour = sysObject.color;
    } else {
        colour = "FFFFFF";
    }
    
    title.innerHMTL = `<h1 style="color: #${colour};">System Info</h1>`;
}

function showInput(reason) {
    let label;

    if (reason == 404) {
        // Not found
        label = "There is no system by that ID."
    }
    else if (reason == 403) {
        // Forbidden
        label = "This system has their fronters hidden."
    }
    else if (reason == null) {
        // No system ID provided
        label = "Please enter a system ID:"
    };

    // Create form for inputting system ID
    container.innerHTML = `<form>
                            <label name="sys">${label}</label>
                            <input type="text" name="sys">
                            <input type="submit" value="Submit">
                        </form>`
}


if (system != null & system != "") {
    renderTitle();
}
