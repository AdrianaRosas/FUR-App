let login = {
    render: async() => {
        let view = `
<section class="login" id="login">
<header>
<figure><img src="img/fur-logo.png" alt="Logo fur" id="logo-login"></figure>
</header>
<p id="slogan">Porque son más que sólo tus mascotas</p>
<p>Inicia sesión o regístrate con </p>

<div class="redes">
<a id="facebook">
<img src="img/facebook-logo.png" alt="Facebook"> Facebook
</a>
<a id="google">
<img src="img/google-icon.png" alt="Google"> Google
</a>
</div>
<p>O</p>
<form>
<input type="text" class="input-login" placeholder="correo" id="email-login">
<input type="password" name="password" id="current-password" class="input-login" placeholder="Contraseña">
</form>

<!-- Button trigger modal -->
<a href="" class="register" data-toggle="modal" data-target="#exampleModalCenter">Regístrate</a>
<input type="button" value="Ingresar" class="buttons" id="login-button">

</section>


<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="exampleModalCenterTitle">Registro</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div class="modal-body">
<form>
<input type="text" placeholder="Nombre completo" id="user-name" class="input-login register-input">
<input type="email" placeholder="Correo" id="email" class="input-login register-input">
<input type="password" placeholder="Contraseña" id="password" class="input-login register-input">
<p>Mínimo 6 caracteres</p>
<input type="password" placeholder="Confirmar contraseña" id="confirm-p" class="input-login register-input">
<p>Fur esta hecha para compartir contenido, siempre respetando a los miembros de la comunidad</p>
<label for="accept">
<input type="checkbox" name="accept" id="accept">
Acepto
</label>
</form>

</div>
<div class="modal-footer">
<button type="button" class="buttons listo" id="ready">¡Listo!</button>
</div>
</div>
</div>
</div>
`

        return view
    },
    after_render: async() => {

        //Const when user registers
        const userNameInput = document.getElementById('user-name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('confirm-p');
        const acceptRegisterInput = document.getElementById('accept');
        const readyRegister = document.getElementById('ready');

        //Const when user signs in with Facebook, Google or existent account
        const facebook = document.getElementById('facebook');
        const google = document.getElementById('google');
        const emailLogin = document.getElementById('email-login');
        const currentPassword = document.getElementById('current-password');
        const loginButton = document.getElementById('login-button');

        //Events
        readyRegister.addEventListener('click', () => window.register(userNameInput, emailInput, passwordInput, passwordConfirmInput, acceptRegisterInput));

        facebook.addEventListener('click', window.signInFacebook);
        google.addEventListener('click', window.signInGoogle);
        loginButton.addEventListener('click', () => window.signInEmailPassword(emailLogin, currentPassword));
    }
}

export default login;