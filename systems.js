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
    const sysObject = await getSystem();
    
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

if (system != null & system != "") {
    renderTitle();
}
