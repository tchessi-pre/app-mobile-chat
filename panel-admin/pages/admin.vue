<script>
export default {
    data() {
        return {
            search: '',
            setUsers: [],
            totalUsers: 0
        }
    },
    methods: {
        async getUsers() {
            try {
                const token = localStorage.getItem('token');
                const data = await fetch(`http://localhost:3100/api/users?search=${this.search}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const response = await data.json();
                this.setUsers = response.users;
                this.totalUsers = this.setUsers.length;
                console.log(response);
                console.log("success");
            } catch (error) {
                console.log(error);
                console.log("catch");
            }
        },
        logout() {
            this.$router.push({ path: '/login' });
            localStorage.removeItem('token');
        }
    },
    created() {
        this.getUsers()
    },
}

</script>
<template>
    <section class="main-container">
        <header class="header">
            <img class="logo-h" src="~/static/NewLogo.png" alt="Logo-h" />
            <h1 class="w-text h-text">TISSAPP Admin panel</h1>
            <button id="logout-button" @click="logout" class="logout-button">Déconnexion</button>
        </header>

        <div>
            <div class="form-group">
                <label class="w-text label-search" for="search">Rechercher un utilisateur</label>
                <input v-model="search" type="text" class="form-control" id="search"
                    placeholder="Entrer un nom d'utilisateur" @input.prevent="getUsers" />
                <label class="w-text" for="totalUsers">Nombre d'utilisateurs total : {{ totalUsers }}</label>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th class="w-text">ID</th>
                        <th class="w-text">Nom d'utilisateur</th>
                        <th class="w-text">Email</th>
                        <th class="w-text">Date de création</th>
                        <th class="w-text">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in setUsers" :key="user.id">
                        <td class="w-text">{{ user.id }}</td>
                        <td class="w-text">{{ user.firstName }} {{ user.lastName }}</td>
                        <td class="w-text">{{ user.email }}</td>
                        <td class="w-text">{{ user.createdAt }}</td>
                        <td>
                            <button class="btn btn-primary">Modifier</button>
                            <button class="btn btn-danger">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
#__nuxt {
    height: 100%;
    background-color: #0F1828;
}

.main-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0F1828;
    width: 100%;
    height: 100%;
    margin: auto;
}

.header {
    display: flex;
    align-items: center;
    background-color: #423f3f54;
    opacity: 0.8;
    padding-left: 20rem;
}

.logo-h {
    width: 50px;
    height: 50px;
    margin: 10px;
    opacity: 1;
    object-fit: contain;
    display: block;
}

#logout-button {
    color: white;
    background-color: red;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    margin-left: auto;
    margin-right: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin: 20px;
}

.table {
    width: 95%;
    margin: 20px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    text-shadow: 2px 2px 3px #7c7c7c;
}

.h-text {
    font-size: 1.5rem;
    font-weight: 600;
    justify-content: center;
    font-family: 'Sigmar One', cursive;
    text-shadow: 2px 2px 3px #7c7c7c;
}

.label-search {
    float: left;
    font-size: 1rem;
    font-weight: 600;
    justify-content: center;
    text-shadow: 2px 2px 3px #7c7c7c;
}

.w-text {
    color: white;
    font-size: 1rem;
    font-weight: 600;
}
</style>