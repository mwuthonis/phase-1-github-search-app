document.getElementById('github-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form refresh
    const query = document.getElementById('search').value;
    searchUsers(query);
  });

  function searchUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`,{
        headers: {
            Accept:'application/vnd.github.v3+json',
        },
    })
    .then((response)=> response.json())
    .then((data) => displayUsers(data.items))
    .catch((error) => console.error('Error fetching users:', error));
  }
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results
  
    users.forEach((user) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" />
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button onclick="fetchUserRepos('${user.login}')">View Repos</button>
      `;
      userList.appendChild(listItem);
    });
  }
  function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
      .then((response) => response.json())
      .then((repos) => displayRepos(repos))
      .catch((error) => console.error('Error fetching repos:', error));
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous results
  
    repos.forEach((repo) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      `;
      reposList.appendChild(listItem);
    });
  }
  
  