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
