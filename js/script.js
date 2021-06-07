const overview = document.querySelector(".overview");
const userName = "luanhuynh009";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const languages = [];
const backButton = document.querySelector(".view-repos");
const searchInput = document.querySelector(".filter-repos");


const gitUserInfo = async function (){
    const userInfo = await fetch (
        `https://api.github.com/users/${userName}`
    ) ;
    const user = await userInfo.json();
    console.log(user);
    displayUserInfo(user);
}

gitUserInfo();

const displayUserInfo = function(user) {
    const userName = user.name;
    const userBio = user.bio;
    const userLocation = user.location;
    const userRepos = user.public_repos;
    const userAvatar = user.avatar_url;

    const userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("user-info");
    userInfoContainer.innerHTML = 
    `<figure>
        <img alt = "User avatar" src=${userAvatar}/>
    </figure>
    <div>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Bio:</strong> ${userBio}</p>
        <p><strong>Location:</strong> ${userLocation}</p>
        <p><strong>Repos:</strong> ${userRepos}</p>
    </div>`;
    overview.append(userInfoContainer);
} 

const gitRepoInfo = async function(){
    const repoFetch = await fetch (
        `https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`
    )
    const repo = await repoFetch.json();
    console.log(repo);
    displayRepoInfo(repo);
}

const displayRepoInfo = function(repos){
    searchInput.classList.remove("hide")
    for (const repo of repos) {
        const repoListInfo = document.createElement("li");
        repoListInfo.classList.add("repo");
        repoListInfo.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoListInfo);
    }
}

gitRepoInfo();

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        retrieveRepo(repoName);

    }
});

const retrieveRepo = async function(repoName) {
    const retrievedRepo = await fetch(
    `https://api.github.com/repos/${userName}/${repoName}`)
    const repoInfo = await retrievedRepo.json();
    console.log(repoInfo);
    
    const fetchLanguages = await fetch(
        `${repoInfo.languages_url}`
    )
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    for (let data in languageData) {
        languages.push(data)
    }

    console.log(languages);
    displayRetrievedRepo(repoInfo, languages)
    ;
}

const displayRetrievedRepo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDataDiv = document.createElement("div");
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    searchInput.classList.remove("hide");
    repoDataDiv.innerHTML = "";
    repoDataDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href=${repoInfo.html_url} target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
        `
    repoData.append(repoDataDiv);
    backButton.classList.remove("hide");
    
}

backButton.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
})

searchInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchTextLower = searchText.toLowerCase();

    for (let repo of repos) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(searchTextLower)) {
            repo.classList.remove("hide");
        }
        else {
            repo.classList.add("hide");
        }
    }
})
