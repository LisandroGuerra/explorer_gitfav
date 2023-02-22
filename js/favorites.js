import { GithubUser } from "./githubUser.js"


export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage
            .getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try {
            const userExists = this.entries.find(entry => entry.login === username)

            if (userExists) {
                throw new Error('User is already in your favorites.')
            }

            const user = await GithubUser.search(username)

            if(user.login === undefined) {
                throw new Error (`User "${username}" not found!`)
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error) {
            alert(error.message)
        }
        
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }

    onAdd () {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const inputValue = this.root.querySelector('#input-search').value
            this.add(inputValue)
        }
    } 

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `${user.name} github profile image`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repos').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm(`Do you want to delete "${user.name || user.login}" register?`)
                if (isOk) {
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/username.png" alt="Name github profile image">
                <a href="https://github.com/username" target="_blank">
                    <p>Name</p>
                    <span>username</span>
                </a>
            </td>
            <td class="repos">42</td>
            <td class="followers">42</td>
            <td>
                <button class="remove">&times;</button>
            </td>
        `

        return tr
    }
    
}