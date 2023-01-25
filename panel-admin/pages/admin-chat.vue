<script>
import CustomSpinner from '../components/spinner.vue'
export default {
    components: { CustomSpinner },
    data() {
        return {
            showSpinner: false, //Spinner
            search: '', //Search user
            setOneUser: {}, //GetOneUser
            setAllUsers: [], //GetAllUser
            totalUsers: 0, //Count nb user
            errorMessage: '', //Text Err Msge
        }
    },
    methods: {
        async getOneUser(userId) {
            try {
                const data = await fetch(`http://localhost:3100/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const response = await data.json();
                this.setOneUser = response.user;
                console.log(response);
                console.log("success get one user");
            } catch (error) {
                console.log(error);
                console.log("catch get one user");
            }
        },
        async getUsers() {
            try {
                const data = await fetch(`http://localhost:3100/api/users?search=${this.search}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const response = await data.json();
                this.setAllUsers = response.users;
                this.totalUsers = this.setAllUsers.length;
                console.log(response);
                console.log("success get all user");
            } catch (error) {
                console.log(error);
                console.log("catch get all user");
            }
        },
        confirmDelete(userId) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
                this.deleteUser(userId);
            }
        },
        async deleteUser(userId) {
            try {
                const data = await fetch(`http://localhost:3100/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const response = await data.json();
                console.log("success delete user")
                console.log(response);
                this.getUsers();
            } catch (error) {
                console.log("catch delete user")
                console.log(error);
                this.errorMessage = error.message;
            }
        },
        logout() {
            this.showSpinner = true;
            localStorage.removeItem('token');
            setTimeout(() => {
                this.showSpinner = false;
                this.$router.push({ path: '/login' });
            }, 1000);
        }
    },
    created() {
        this.getUsers()
        //Decode token and get user connected
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            const token = localStorage.getItem('token');
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userId;
            this.getOneUser(userId);
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }

    },
}
</script>
<template>
    <section class="main-container">
        <!-- HEADER -->
        <header class="header">
            <img class="logo-h" src="~/static/NewLogo.png" alt="Logo-h" />
            <h1 class="w-text h-text">TISSAPP Admin panel
                <p class="w-text">Administrateur: {{ setOneUser.firstName }} {{ setOneUser.lastName }}</p>
            </h1>
            <!-- logout button -->
            <button id="logout-button" @click="logout(); showSpinner = true">Déconnexion</button>
            <!-- spinner -->
            <custom-spinner v-if="showSpinner"></custom-spinner>
        </header>
        <!-- SEARCH USER -->
        <div>
            <div class="form-group">
                <label class="w-text label-search" for="search">Rechercher un utilisateur</label>
                <input v-model="search" type="text" class="form-control" id="search"
                    placeholder="Entrer un nom d'utilisateur" @input.prevent="getUsers" />
                <label class="w-text" for="totalUsers">Nombre d'utilisateurs total : {{ totalUsers }}</label>
            </div>
            <div class="overflow-auto user-container" style="max-height: 500px">
                <!-- TABLE USER -->
                <table class="table">
                    <thead>
                        <tr>
                            <th class="w-text">ID</th>
                            <!-- <th class="w-text">Avatar</th> -->
                            <th class="w-text">Nom d'utilisateur</th>
                            <th class="w-text">Email</th>
                            <th class="w-text">Rôle</th>
                            <th class="w-text">Date de création</th>
                            <th class="w-text">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- USER DATA -->
                        <tr v-for="user in setAllUsers" :key="user.id">
                            <td class="w-text">{{ user.id }}</td>
                            <!-- <td class="w-text">{{ user.imageUrl }}</td> -->
                            <td class="w-text">{{ user.firstName }} {{ user.lastName }}</td>
                            <td class="w-text">{{ user.email }} </td>
                            <td>
                                <p class="text-sucess" v-if="user.admin === true">Administrateur</p>
                                <p class="text-info" v-if="user.admin === false">Utilisateur</p>
                            </td>
                            <td class="w-text">{{ user.createdAt }}</td>
                            <td v-if="user.admin === false">
                                <!-- EDIT USER -->
                                <button class="btn btn-primary">Modifier</button>
                                <!-- DELETE USER -->
                                <button class="btn btn-danger" @click="confirmDelete(user.id)">Supprimer</button>
                                <!-- MSGE ERROR -->
                                <p class="error-text">{{ errorMessage }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<style scoped>
.main-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0F1828;
    height: 100vh;

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
    border-radius: 5px;
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
}

.user-container {
    border: 1px solid rgb(96, 97, 97);
    border-radius: 20px;
    padding: 0.2rem;
    margin: 1rem;
    box-shadow: 10px 5px 5px rgb(70, 70, 70);
}

.h-text {
    padding-top: 20px;
    font-size: 1.5rem;
    font-weight: 600;
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

.text-sucess {
    color: green;
    font-weight: 600;
}

.text-info {
    color: rgb(52, 124, 233);
    font-weight: 600;
}
</style>