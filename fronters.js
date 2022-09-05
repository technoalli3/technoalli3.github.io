const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");
const container = document.querySelector('.container');

async function getFronters() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/fronters");
    if (response.status != 200) {
        showInput(response.status)
        return null
    }
    return await response.json()
}

async function getSystem() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system);
    if (response.status != 200) {
        showInput(response.status)
        return null
    }
    return await response.json()
}

async function renderFronters() {
    const fronters = await getFronters();
    if (fronters == null) {
        return
    }
    
    const sysObject = await getSystem();
    const nameContainer = document.getElementById("name-container");
    let colour = sysObject.color;//gets sys colour
    
    if(sysObject.name != null) {//if system is named use sysname
        let str = sysObject.name;
        str += " Fronter Display";
        
        document.getElementById("tabname").innerHTML = str
        
        if(colour != null) {//has colour
            nameContainer.innerHTML = `<h1><h1 style = "color: #${colour};"> ${sysObject.name} </h1> Fronter Display</h1>`
        } else {
            nameContainer.innerHTML = `<h1>${str}</h1>`
        }
    } else {//no sysname, use sysID
        document.getElementById("tabname").innerHTML = system + " Fronter Display"
        if(colour != null) {//has colour
            nameContainer.innerHTML = `<h1><code style = "color: #${colour};"> ${system} </code> Fronter Display</h1>`
        } else {
            nameContainer.innerHTML = `<h1><code> ${system} </code> Fronter Display</h1>`
        }
    }
    
    
    
    
    let html = '';
    fronters.members.forEach(fronter => {       
        
        let avatar
        if (fronter.avatar_url != null) {
            avatar = `<img src="${fronter.avatar_url}" alt="Profile Picture", style="float:left;">`
        }
        else {//no profile picture
            avatar = `<img src="blank.png" alt="Profile Picture", style="float:left;">`
        }
        
        let fronterPronouns
        if(fronter.pronouns != null) {
            fronterPronouns = fronter.pronouns
        } else {//no pronouns
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
    
    //back button
    let segment = `<form>
                        <input type="submit" value="Go Back">
                    </form>`

    let container = document.querySelector('.container');
    container.innerHTML = html;
    
    let goBack = document.querySelector('.goBack');
    goBack.innerHTML = segment;
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
                            <input type="submit" value="Submit">
                        </form>`
}

if (system != null & system != "") {
    container.innerHTML = `<code>Loading fronters...</code>`
    renderFronters();
}
else {
    showInput(null)
};
