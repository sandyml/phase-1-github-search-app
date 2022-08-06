const form = document.getElementById('github-form')
form.addEventListener("submit", (e) => {
    e.preventDefault()
    // data we want to pass from the form 
    e.target[0].value
    // fetch request using GET
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => response.json())
    .then(response => {
    // grab and extract through login, avatar_url, url 
    const userList = document.querySelector("#user-list")
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    userList.innerHTML = ""
    response.items.map(item => {
        // display elements on the page 
        const li = document.createElement("li")
        const h2 = document.createElement("h2")
        h2.textContent = item.login

        // click event listener 
        h2.addEventListener("click", e => showUserRepo(item.login, e))
        const img = document.createElement("img")
        img.src = item.avatar_url

        li.append(h2, img)
        userList.append(li)
    })
    // if you have 5 inputs - it will only do the first one unless you repeat it but thats a lot of work
    e.target[0].value = ""
    })
    // last part: once we submit the forms, need to clear the forms using reset if you have multiple inputs 
    // form.reset() 
})

function showUserRepo(username, e) {
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault() 
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => response.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
    }))
}
