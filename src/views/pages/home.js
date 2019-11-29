
const home = {
    render: async() => {
        const view = /*html*/ `
            <section class="home">
            <hr class="line-1">
            <div class="flex-container">
            <div class="memes">
            <img src="img/happy-emoticon-with-one-tooth.svg" alt="Memes" id="memes">
            <p class="etiquetas-filtrado">Memes</p>
            </div>
            <div class="veterinario">
            <img src="img/vaccine.svg" alt="Veterinario" id="veterinario">
            <p class="etiquetas-filtrado">Veterinario</p>
            </div>
            <div class="pet-friendly">
            <img src="img/pet.svg" alt="PetFriendly" id="pet-friendly">
            <p class="etiquetas-filtrado">PetFriendly</p>
            </div>
            <div class="tips">
            <img src="img/elemental-tip.svg" alt="Tips" id="tips">
            <p class="etiquetas-filtrado">Tips</p>
            </div>
            <div class="perdidos">
            <img src="img/icon.svg" alt="Perdidos" id="perdidos">
            <p class="etiquetas-filtrado perdidos">Perdidos</p>
            </div>
            </div>
            <hr class="line-2">

            <!--Trigger modal -->
            <div class="conteiner-all-posts">
            <div class="conteiner-post" data-toggle="modal" data-target="#exampleModal">          
            <div class="crea-post" >
            <p class="c-post">Crear post</p>
            </div>
            <div class="photo-post">
            <div id="root-1"></div>
            <p class="think">¿En qué piensas?</p>
            </div>
           
            </div>
            <div id="root">
                    </div>
            </div>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">¡Realiza una publicación!
          <img src="img/kitty.svg" alt="gatito" class="kitty">
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
           </div>
           <div class="modal-body">
            <select name="" class="select-filter">
          <option value="All">¿Sobre qué tema publicarás?</option>
          <option value="Meme">Meme</option>
          <option value="Veterinario">Veterinario</option>
          <option value="PetFriendly">PetFriendly</option>
          <option value="Tips">Tips</option>
          <option value="Perdidos">Perdidos</option>
          </select>
           <textarea placeholder="¿En que piensas?" class="publicacion" id="publicacion"></textarea>
           </div>
          <div class="image">
          </div> 
          <div class="modal-footer">
          <button type="button" class="btn-btn-primary" id="btn-post" data-toggle="modal" data-target="#exampleModal"><p class="btn-text">Publicar</p></button>
          </div>
          </div>
          </div>
          </div>
          </div>
           
          </section>

        `
        return view
    },
    after_render: async() => {
      const postsButton = document.querySelector('#btn-post');
      const selectFilter = document.querySelector('.select-filter');
      const user = await firebase.auth().currentUser;
      console.log(user)
      //Guardar data de los post
      const savingPostData = (postInput, postFilter, postlikes) => {
        const user = firebase.auth().currentUser;
       
      const currentDate = new Date();
      const strDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
        
        db.collection('posts').add({
          name : user.displayName,
          post : postInput,
          photo: user.photoURL,
          userID: user.uid,
          filter: postFilter,
          date: strDate, 
          likes: postlikes
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        })
      }

        //Para obtener todos los post

        const gettingAllPost = () => {
          //Método para obtener la data de los post
          db.collection("posts").orderBy('date','desc')
          .get()
          .then((querySnapshot) => {
            const user = firebase.auth().currentUser;
            const root = document.querySelector("#root");
            const rootProfile = document.querySelector("#root-1");
            let str = ' ';
            let strProfile = ' ';
            
            querySnapshot.forEach((doc) => {
              let theme = doc.data().filter;
              if(theme == undefined){
                
              theme = 'General';
            } 
                str += `
                <div class="post-print conteiner-post-home">
                  <div class="profile-reactions">
                        <img src="${doc.data().photo}" alt="Foto de perfil" class="photo-profile">
                        <p class="think t">${doc.data().name}</p>
                    <div class="reactions">
                        <i class="fas fa-smile-beam" id="smile"></i><p class="likes">${doc.data().likes}</p>
                        <i class="fas fa-angry" id="angry"></i>
                        <i class="fas fa-comment" id="comment"></i>
                        <i class="fas fa-share-alt-square" id="share"></i>
                    </div>
                  </div>
                    <div class="post-info-container">
                        <div class="post-content-theme-title">
                            <p class="th" id="tema">Tema: ${theme} </p><span>${doc.data().date}</span>
                        </div>
                        <p class="think th"> ${doc.data().post}</p>
                    </div>
                  </div>
                  `;
                  strProfile = `
                  <div>
                      <img src="${user.photoURL}" alt="Foto de perfil" class="photo-profile">
                </div>
                `;
                
              rootProfile.innerHTML = strProfile;
              root.innerHTML = str;
            });
        });
        }

        gettingAllPost();
      
      //Parametros para crear data de post
      postsButton.addEventListener('click', () => {
        //Guarda data de los filtros
        const postInput = document.querySelector('#publicacion').value;
        //Guarda filtro seleccionado
        const postFilter =(selectFilter.options[selectFilter.selectedIndex].value);
       const likes = //función para agregar
        
        savingPostData(postInput, postFilter, likes);
        gettingAllPost()
      })

      //Llamando las clases de las cajitas de cada filtro
         
      const postsRef = db.collection('posts');
      const filterTips = document.querySelector('.tips');
      const filterMemes = document.querySelector('.memes');
      console.log(filterMemes)
      const filterVeterinario = document.querySelector('.veterinario');
      const filterPetfriendly = document.querySelector('.pet-friendly');
      const filterPerdidos = document.querySelector('.perdidos');
      

      //Obtener las tarjetas por cada filtro
      const filterPost = (fil) => {postsRef.where('filter', '==', fil )
      .get()
      .then((querySnapshot) => {
        const root = document.querySelector("#root");
        const user = firebase.auth().currentUser;
        const rootProfile = document.querySelector("#root-1");
        let str = ' ';
        let strProfile = ' ';

      querySnapshot.forEach((doc) => {
        let theme = doc.data().filter;
        if(theme == undefined){
          
        theme = 'General';
      } 
          str += `
          <div class="post-print conteiner-post-home">
              <div class="profile-reactions">
                    <img src="${doc.data().photo}" alt="Foto de perfil" class="photo-profile">
                    <p class="think t">${doc.data().name}</p>
                <div class="reactions">
                    <i class="fas fa-smile-beam"></i>
                    <i class="fas fa-angry"></i>
                    <i class="fas fa-comment"></i>
                    <i class="fas fa-share-alt-square"></i>
                </div>
              </div>
                <div class="post-info-container">
                    <div class="post-content-theme-title">
                        <p class="th" id="tema">Tema: ${theme} </p><span>${doc.data().date}</span>
                    </div>
                    <p class="think th"> ${doc.data().post}</p>
                </div>
              </div>
              `;
              strProfile = `
              <div>
                  <img src="${user.photoURL}" alt="Foto de perfil" class="photo-profile">
            </div>
            `;
      
        })
        root.innerHTML = str;
      
       })
      
  }
       

       //Funcionalidad de filtros
       filterMemes.addEventListener('click', () => {
         filterPost('Meme')
         console.log('Hola se ejecuta filtrado de memes')
         });
       filterTips.addEventListener('click', () => filterPost('Tips'));
       filterVeterinario.addEventListener('click', () => {filterPost('Veterinario')}, true);
       filterPetfriendly.addEventListener('click', () => {filterPost('PetFriendly')}, true);
       filterPerdidos.addEventListener('click', () => {filterPost('Perdidos')}, true); 

       //Funcionalidad de likes
      
      //Guardar likes de post
      //const postLike =document.querySelector('#smile');
      //postLike.addEventListener('click', ()=>{/*función para agregar*/}, true)
      
      

      
       
      
    }

  }  
       
        
    

export default home;