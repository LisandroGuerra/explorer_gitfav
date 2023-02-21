export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = [
            {
                login: 'LisandroGuerra',
                name: "Lisandro Guerra Simões Pires",
                public_repos: '147',
                followers: '127'
            },
            {
                login: 'lisandrasp',
                name: "Lisandra Simões Pires",
                public_repos: '11',
                followers: '16'
            }
        ]
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `${user.name} github profile image`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repos').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('You are about to delete this row. Are you sure?')
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
                <img src="https://github.com/LisandroGuerra.png" alt="Lisandro Guerra github profile image">
                <a href="https://github.com/LisandroGuerra" target="_blank">
                    <p>Lisandro</p>
                    <span>lgsp</span>
                </a>
            </td>
            <td class="repos">07</td>
            <td class="followers">07</td>
            <td>
                <button class="remove">&times;</button>
            </td>
        `

        return tr
    }
    
}