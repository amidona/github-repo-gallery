//div for profile information
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoClass = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");
const username = "amidona";
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//function to grab data from GitHub profile
const getUserData = async function () {
    const requestUserData = await fetch(`https://api.github.com/users/${username}`);
    const userData = await requestUserData.json();
    //console.log(userData);
    displayUserInfo(userData);
};

getUserData();

//function to display user info
const displayUserInfo = function (userData) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
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

//function to display list of repos
const displayRepoData = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

//event listener to show individual repo info
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//function to get specific repo info
const getRepoInfo = async function (repoName) {
    const requestRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await requestRepoInfo.json();
    //console.log(repoInfo)
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData)
    const languages = [];
    for (language in languageData) {
        languages.push(language)
    };
    //console.log(languages)
    displayRepoInfo(repoInfo, languages)
};

//function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    individualRepoData.append(repoInfoDiv);
    individualRepoData.classList.remove("hide");
    repoClass.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

//click event for the back button
viewReposButton.addEventListener("click", function () {
    repoClass.classList.remove("hide");
    individualRepoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

//input event to run the search box
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const lowerSearchText = searchText.toLowerCase();
    for (const repo of repos) {
        const lowerTitle = repo.innerText.toLowerCase();
        if (lowerTitle.includes(lowerSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    };
})