const overview = document.querySelector(".overview");
const userName = "luanhuynh009";
const repoList = document.querySelector(".repo-list");

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

    for (const repo of repos) {
        const repoListInfo = document.createElement("li");
        repoListInfo.classList.add("repo");
        repoListInfo.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoListInfo);
    }
}

gitRepoInfo();