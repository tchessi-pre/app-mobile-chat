<script>
import CustomSpinner from '../components/spinner.vue'
import CustomModal from '../components/modal.vue'
import Swal from 'sweetalert2'
export default {
    components: { CustomSpinner, CustomModal },

    data() {
        return {
            showSpinner: false, //Spinner
            showModal: false, //
            setOneUser: {}, //GetOneUser
            setAllUsers: [], //GetAllUser
            lastFourUsers: [],// Get 4 last users
            setAllPosts: [], //GetAllPost
            lastFourPosts: [],// Get 4 last messages
            totalUsers: 0, //Count nb users
            totalPosts: 0, //Count nb Posts
            errorMessage: '', //Text Err Msge
        }
    },
    methods: {
        // REQUEST GET ONE USER
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

        // REQUEST GET ALL USER
        async getUsers() {
            try {
                const data = await fetch(`http://localhost:3100/api/users?search=`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const response = await data.json();
                this.setAllUsers = response.users;
                this.totalUsers = this.setAllUsers.length;
                this.lastFourUsers = this.setAllUsers.slice(-4);
                console.log(response);
                console.log("success get all user");
            } catch (error) {
                console.log(error);
                console.log("catch get all user");
            }
        },

        // GET ALL POSTS
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
                this.totalPosts = this.setAllPosts.length;
                this.lastFourPosts = this.setAllPosts.slice(-4);
                console.log("success get all posts");
            } catch (error) {
                console.log(error);
                console.log("catch get all posts");
            }
        },

        // user PANEL
        userPanel() {
            setTimeout(() => {
                this.showSpinner = false;
                this.$router.push({ path: '/admin-user' });
            }, 1000);
        },

        // CHAT PANEL
        chatPanel() {
            setTimeout(() => {
                this.showSpinner = false;
                this.$router.push({ path: '/admin-chat' });
            }, 1000);
        },

        // LOGOUT
        logout() {
            this.showSpinner = true;
            localStorage.removeItem('token');
            setTimeout(() => {
                this.showSpinner = false;
                this.$router.push({ path: '/login' });
            }, 1000);
        },
    },

    // CREATED
    created() {
        this.getPosts()
        this.getUsers()
        //Decode token and get user connected
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            const token = localStorage.getItem('token');
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userId;
            this.getOneUser(userId);
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
            <div class="button-header">
                <!-- user button -->
                <button id="user-button" @click="userPanel(); showSpinner = true">User-panel</button>
                <!-- chat button -->
                <button id="chat-button" @click="chatPanel(); showSpinner = true">Chat-panel</button>
                <!-- logout button -->
                <button id="logout-button" @click="logout(); showSpinner = true">Déconnexion</button>
                <!-- spinner -->
                <custom-spinner v-if="showSpinner"></custom-spinner>
            </div>
        </header>
        <!-- -->
        <div>
            <h2 class="title-admin">Bonjour {{ setOneUser.firstName }} {{ setOneUser.lastName }}!</h2>
        </div>
        <!-- first square -->
        <div class="container">
            <div class="container-square-left">
                <div class="square">
                    <h4 class="w-text">Nombre d'utilisateurs: {{ totalUsers }}</h4>
                </div>
            </div>
            <div class="container-square">
                <div class="square">
                    <h4 class="context">Dernier utilisateur: </h4>
                    <div class="context" v-for="users in lastFourUsers" :key="users._id">
                        {{ users.email }} -
                        {{ users.firstName }}
                        {{ users.lastName }}
                    </div>
                </div>
            </div>
            <div class="container-square-left">
                <div class="square">
                    <h4 class="w-text">Nombre de messages: {{ totalPosts }}</h4>
                </div>
            </div>
            <div class="container-square">
                <div class="square">
                    <h4 class="context">Dernier messages:</h4>
                    <div class="context" v-for="post in lastFourPosts" :key="post._id">
                        {{ post.User.email }} -
                        {{ post.User.firstName }}
                        {{ post.User.lastName }}
                        <br>
                        {{ post.content }}
                    </div>
                </div>
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
    background-image: linear-gradient(360deg, #0F1828, #272929);
    height: 100vh;
}

/* HEADER */
.header {
    display: flex;
    align-items: center;
    background-color: #423f3f54;
    background-image: linear-gradient(120deg, #155799, #159957);
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

#chat-button,
#user-button {
    color: white;
    background-color: rgb(96, 52, 177);
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    margin: 20px;
    border-radius: 5px;
    align-self: flex-end;
}


.h-text {
    padding-top: 20px;
    font-size: 1.5rem;
    font-weight: 600;
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

/* BODY */
.title-admin {
    margin: 20px;
    margin-bottom: 20px;
    color: white;
    display: flex;
    justify-content: center;
    opacity: 0.8;
}

.container {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(2, 2fr);
    max-width: 50%;
}

.container-square {
    max-width: 100%;
}

.container-square-left {
    max-width: 55%;
}


.square {
    background-color: #242323;
    background-image: linear-gradient(360deg, #202f49, #245050);
    border: 1px solid rgb(46, 42, 42);
    border-radius: 5%;
    opacity: 0.9;
    box-shadow: 10px 10px #0F1828;
    padding: 1rem;
    margin: 10px;
    overflow-y: auto;
    word-wrap: break-word;
    word-break: break-all;
    max-height: 35vh;
    min-height: 10vh;
    transition: all 0.5s;
}

.context {
    border-bottom: 1px solid rgb(134, 133, 133);
    opacity: 0.9;
    margin: 2px;
    padding: 5px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #fff;
}
</style>