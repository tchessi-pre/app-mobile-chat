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
            setAllPosts: [], //GetAllPost
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

        async getPosts() {
            try {
                const response = await fetch(`http://localhost:3100/api/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                console.log(data);
                this.setAllPosts = data.posts;
                console.log("success get all posts");
            } catch (error) {
                console.log(error);
                console.log("catch get all posts");
            }
        },

        userPannel() {
            setTimeout(() => {
                this.showSpinner = false;
                this.$router.push({ path: '/admin-user' });
            }, 1000);
        },
        logout() {
            this.showSpinner = true;
            localStorage.removeItem('token');
            setTimeout(() => {
                this.showSpinner = false;
                this.$router.push({ path: '/login' });
            }, 1000);
        },
        confirmDelete(userId) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {

            }
        },
    },
    created() {
        this.getPosts()
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
            <h1 class="w-text h-text">TISSAPP Admin pannel
                <p class="w-text">Administrateur: {{ setOneUser.firstName }} {{ setOneUser.lastName }}</p>
            </h1>
            <div class="button-header">
                <!-- chat button -->
                <button id="chat-button" @click="userPannel(); showSpinner = true">User-pannel</button>
                <!-- logout button -->
                <button id="logout-button" @click="logout(); showSpinner = true">Déconnexion</button>
                <!-- spinner -->
                <custom-spinner v-if="showSpinner"></custom-spinner>
            </div>
        </header>
        <!-- MAIN -->
        <div>
            <div class="overflow-auto post-container" style="max-height: 600px">
                <h1 class="w-text title ">Chat Pannel</h1>
                <!-- TABLE USER -->
                <table class="table">
                    <thead>
                        <tr>
                            <th class="w-text">ID</th>
                            <!-- <th class="w-text">Avatar</th> -->
                            <th class="w-text">Nom d'utilisateur</th>
                            <th class="w-text">Posts</th>
                            <th class="w-text">Date de création</th>
                            <th class="w-text">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- POST DATA -->
                        <tr v-for="post in setAllPosts" :key="post.id">
                            <td class="w-text">{{ post.id }}</td>
                            <td class="w-text">{{ post.User.firstName }} {{ post.User.lastName }}</td>
                            <td class="w-text">{{ post.content }}</td>
                            <td class="w-text">{{ post.createdAt }}</td>
                            <td>
                                <!-- EDIT USER -->
                                <button class="btn btn-primary">Modifier</button>
                                <!-- DELETE USER -->
                                <button class="btn btn-danger">Supprimer</button>
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

.button-header {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
    margin-left: 45rem;
}

#logout-button {
    color: white;
    background-color: red;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    margin: 20px;
    border-radius: 5px;

}

#chat-button {
    color: white;
    background-color: rgb(96, 52, 177);
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    margin: 20px;

    border-radius: 5px;
    align-self: flex-end;
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

.post-container {
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

.title {
    font-size: 2rem;
    font-weight: 600;
    justify-content: center;
    text-shadow: 2px 2px 3px #7c7c7c;
    padding: 15px;
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