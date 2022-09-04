const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");
const container = document.querySelector('.container');

async function getFronters() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/fronters");
    if (response.status != 200) {
        showInput(response.status)
        if(response.status == 404) {
            return "NO_FRONTER"
        } else {
            return null
        }
    }
    return await response.json()
}

async function renderFronters() {
    const fronters = await getFronters();
    if (fronters == null) {
        return
    }
    
    document.getElementById("sysid").innerHTML = system
    
    let html = '';
    fronters.members.forEach(fronter => {       
        
        let avatar
        if (fronter.avatar_url != null) {
            avatar = `<img src="${fronter.avatar_url}" alt="Profile Picture", style="float:left;">`
        }
        else {
            avatar = ``
        }
        
        let fronterPronouns
        if(fronter.pronouns != null) {
            fronterPronouns = fronter.pronouns
        } else {
            //fronterPronouns = fronter.display_name
            fronterPronouns = "This fronter has no pronouns set."
        }

        let htmlSegment = `<div class="fronter">
                            ${avatar}
                            <h2>${fronter.name}</h2>
                            <p>${fronterPronouns}</p>
                        </div>
                        <br style="clear:both">`;

        html += htmlSegment;
    });
    
    if(fronters == "NO_FRONTER") {
        html = `<div class="fronter">
                    <h2>There are no fronters right now!</h2>
                </div>`;
    }

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

function showInput(reason) {
    console.log(reason)
    let label;
    if (reason == 404) {
        label = "There is no system by that ID."
    }
    else if (reason == 403) {
        label = "This system has their fronters hidden."
    }
    else if (reason == null) {
        label = "Please enter a system ID:"
    };
    container.innerHTML = `<form>
                            <label name="sys">${label}</label>
                            <input type="text" name="sys">
                            <input type="submit">
                        </form>`
}

if (system != null & system != "") {
    container.innerHTML = `<code>Loading fronters...</code>`
    renderFronters();
}
else {
    showInput(null)
};
