const overview = document.querySelector(".overview");
const userName = "luanhuynh009";

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