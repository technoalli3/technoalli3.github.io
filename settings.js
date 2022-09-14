const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");
const token = new URLSearchParams(queryString).get("token");


renderFields();

async function getSettings() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/settings/", {
        headers: {
            "Authorization": token
        }
    })
    return await response.json()
}

async function renderFields() {
    const settings = await getSettings();
    console.log(settings);

    let html = `<label>Timezone:
                    <input type="text" id="time" value="${settings.timezone}">
                </label>
                <br>
                <label>Pings enabled:
                    <input id="pings" type="checkbox">
                <label>
                <br>
                <label>New members default to private:
                    <input type="checkbox" id="member_private">
                </label>
                <br>
                <label>New groups default to private:
                    <input type="checkbox" id="group_private">
                </label>
                <br>
                <label>Show private info:
                    <input type="checkbox" id="info">
                </label>
                <br>
                <label>Member limit:
                    <input id="read-only" type="text" readonly value="${settings.member_limit}">
                </label>
                <br>
                <label>Group limit:
                    <input id="read-only" type="text" readonly value="${settings.group_limit}">
                </label>
                <br>
                <br>
                <button type="submit" onclick="buildSettings()">Submit</button>
                <div id="status"></div>`

    document.getElementById("fields").innerHTML = html;

    if(settings.pings_enabled) {
        document.getElementById("pings").checked = true;
    }
    if(settings.member_default_private) {
        document.getElementById("member_private").checked = true;
    }
    if(settings.group_default_private) {
        document.getElementById("group_private").checked = true;
    }
    if(settings.show_private_info) {
        document.getElementById("info").checked = true;
    }
}

async function buildSettings() {
    document.getElementById("status").innerHTML = `<div id="status-waiting"></div>`
    const settings = await getSettings();

    settings.timezone = document.getElementById("time").value;
    settings.pings_enabled = document.getElementById("pings").checked;
    settings.member_default_private = document.getElementById("member_private").checked;
    settings.group_default_private = document.getElementById("group_private").checked;
    settings.show_private_info = document.getElementById("info").checked;

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", 'https://api.pluralkit.me/v2/systems/' + system + '/settings/', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token);

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                html = `<div id="status-success"></div>`
                document.getElementById("status").innerHTML = html;
                html = `<h2 id="error-message">Settings successfully updated!</h2>`
                document.getElementById("error-field").innerHTML = html;
                
                console.log(xhr.response)
                let returnedMember = xhr.response;

            }
            if(xhr.status === 401) {
                html = `<div id="status-fail"></div>`
                document.getElementById("status").innerHTML = html;
                html = `<h2 id="error-message">Token is invalid</h2>`
                document.getElementById("error-field").innerHTML = html;
            }
            if(xhr.status === 403) {
                html = `<div id="status-fail"></div>`
                document.getElementById("status").innerHTML = html;
                html = `<h2 id="error-message">Some of your information is invalid</h2>`
                document.getElementById("error-field").innerHTML = html;
            }
        }
    }
    xhr.send(JSON.stringify(settings));
}