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
            search: '', //Search user
            setOneUser: {}, //GetOneUser
            setAllUsers: [], //GetAllUser
            setAllPosts: [], //GetAllPost
            totalUsers: 0, //Count nb user
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

        // REQUEST DELETE USER
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

        // EDIT USER
        confirmEdit(userId) {
            Swal.fire({
                title: 'Modifier un utilisateur !',
                html: `
                        <input id="swal-input1" class="swal2-input" placeholder="Email">
                        <input id="swal-input2" class="swal2-input" placeholder="Prénom">
                        <input id="swal-input3" class="swal2-input" placeholder="Nom">
                    `,
                focusConfirm: false,
                showCancelButton: true,
                color: '#fff',
                background: '#0F1828',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, modifier!',
                cancelButtonText: 'Annuler',
                icon: 'info',
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value
                    ]
                }
            }).then((result) => {
                if (result.value) {
                    const email = result.value[0]
                    const firstName = result.value[1]
                    const lastName = result.value[2]
                    // faire quelque chose avec ces valeurs
                }
            })

        },

        // DELETE USER
        confirmDelete(userId) {
            Swal.fire({
                title: "Êtes-vous sûr de vouloir supprimer cet utilisateur?",
                text: "Cette action est irréversible!",
                icon: 'warning',
                showCancelButton: true,
                color: '#fff',
                background: '#0F1828',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!',
                cancelButtonText: 'Annuler'
            }).then((result) => {
                if (result.value) {
                    this.deleteUser(userId);
                }
            })
        },
    },

    // CREATED
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

.title {
    font-size: 2rem;
    font-weight: 600;
    justify-content: center;
    text-shadow: 2px 2px 3px #7c7c7c;
    padding: 15px;
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