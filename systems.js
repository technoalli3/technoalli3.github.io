const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");

const title = document.getElementById("title");


async function getSystem() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system);

    if (response.status != 200) {
        showInput(response.status)
        return null
    }

    return await response.json()
}

async function renderTitle() {
    
    let name
    if(system.name != null) {
        name = system.name;
    } else {
        name = system;
    }
    
    let colour
    if(system.color != null) {
        colour = system.color;
    } else {
        colour = "FFFFFF";
    }
    
    title.innerHMTL = `<h1><span style="color: #${colour};">${name}</span> System Info</h1>`
}
