//div for profile information
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list")
const username = "amidona";

//function to grab data from GitHub profile
const getUserData = async function () {
    const requestUserData = await fetch(`https://api.github.com/users/${username}`);
    const userData = await requestUserData.json();
    //console.log(userData);
    displayUserInfo(userData);
};

getUserData();

const displayUserInfo = function (userData) {
    const userInfo = document.createElement("div");
    userInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>
    `;
    overview.append(userInfo);
    getRepoData();
};

//function to grab repo data
const getRepoData = async function () {
    const requestRepoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await requestRepoData.json();
    //console.log(repoData);
    displayRepoData(repoData);
};

const displayRepoData = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add(".repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

