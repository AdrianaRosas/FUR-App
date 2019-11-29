let Navbar = {
    render: async() => {
        let view = `
        <header class="header">

        <nav>
            <figure>
                <img src="img/fur-logo.png" alt="logo">
            </figure>
            <menu>
                <ul class="menu">
                    <li class="menu-bars">
                        <i class="fas fa-bars"></i>
                        <ul class="options">
                            <div class="options-menu">
                                <li><a href="#/home">Inicio</a> </li>
                                <li><a href="#/perfil">Mi perfil</a> </li>
                                <li><a href="#/mis-mascotas">Mis mascotas</a></li>
                                <li><a href="#/mis-actividades">Mis actividades</a></li>
                                <li><a href="#/ayuda">Ayuda</a></li>
                                <li id="sign-out">Cerrar sesión</li>
                            </div>
                        </ul>
                    </li>

                </ul>
                <ul class="menu-desktop">
                    <li><a href="#/home">Inicio</a> </li>
                    <li><a href="#/perfil">Mi perfil</a> </li>
                    <li><a href="#/mis-mascotas">Mis mascotas</a></li>
                    <li><a href="#/mis-actividades">Mis actividades</a></li>
                    <li><a href="#/ayuda">Ayuda</a></li>
                    <li id="sign-out-desk">Cerrar sesión</li>
                </ul>
            </menu>

        </nav>
        <hr id="divider">
    </header>`
        return view
    },
    after_render: async() => {
        const signOutDesk = document.getElementById('sign-out-desk');
        const signOutMob = document.getElementById('sign-out');

        signOutDesk.addEventListener('click', window.signOut);
        signOutMob.addEventListener('click', window.signOut);
    }
}
export default Navbar;