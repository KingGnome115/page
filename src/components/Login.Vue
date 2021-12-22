<template lang="">
    <div class="container">
        <div class="row mt-3">
            <div class="modal-dialog text-center">
                <div class="col-sm-8 main-section">
                    <div class="modal-content">
                        <div class="col-12 user-img">
                            <img src="../img/user.png" th:src="@{/img/user.png}">
                        </div>

                        <form class="col-12">
                            <!--Nombre-->
                            <div class="form-group" id="usuario">
                                <input type="text" class="form-control valid" placeholder="Nombre de usuario" name="username" required>
                            </div>

                            <!--Tipo-->
                            <div class="form-group" id="tipo">
                                <select class="form-select form-control valid" id="tipo" aria-describedby="Tipo de usuario" required>
                                    <option selected disabled value="">Tipo de usuario</option>
                                    <option>Administrador</option>
                                    <option>Doctor</option>
                                    <option>Secretaria</option>
                                    <option>Enfermera</option>
                                    <option>Cordinador</option>
                                    <option>Laboratorio</option>
                                    <option>Paciente</option>
                                </select>
                            </div>

                            <!--Contraseña-->
                            <div class="form-group" id="contra">
                                <input type="password" class="form-control valid" placeholder="Contraseña" name="contra" required>
                            </div>

                            <button type="submit" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i>  Ingresar </button>
                        </form>
                        <div class="col-12 forgot">
                            <a href="#">Recordar contraseña?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!--Necesito poner estos dos pero no se como :( o no se si ya no se necesiten es para los iconos xd 

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/solid.css">
        <script src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
-->

<style scoped>
    body {
        background: #F8F8FF;
        padding: 10px;
    }

    .main-section{
    margin:0 auto;
    margin-top:25%;
    padding: 0;
    }

    .modal-content{
        background-color: #3b4652;
        opacity: .85;
        padding: 0 20px;
        box-shadow: 0px 0px 3px #848484;
    }
    .user-img{
        margin-top: -50px;
        margin-bottom: 35px;
    }

    .user-img img{
        width: 100xp;
        height: 100px;
        box-shadow: 0px 0px 3px #848484;
        border-radius: 50%;
    }

    .form-group input{
        height: 42px;
        font-size: 18px;
        border:0;
        padding-left: 54px;
        border-radius: 5px;
    }

    .form-group#tipo input{
        padding-left: 70px; 
    }

    .form-group::before{
        font-family: "Font Awesome\ 5 Free";
        position: absolute;
        left: 28px;
        font-size: 22px;
        padding-top:4px;
    }

    .form-group#usuario::before{
        content: "\f007";
    }

    .form-group#tipo::before{
        content: "\f2b9";
    }

    .form-group#contra::before{
        content: "\f023";
    }

    button{
        width: 60%;
        margin: 5px 0 25px;
    }
</style>