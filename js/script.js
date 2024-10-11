let buscarPelicula = document.getElementById("inputBuscar"); 
let btnBuscar = document.getElementById("btnBuscar"); 
let container = document.getElementById("lista"); 

// ∩(︶▽︶)∩ cargar los datos de las peliculas//
fetch('https://japceibal.github.io/japflix_api/movies-data.json')
   .then(response => response.json())
   .then(data => {
    peliculas = data;
    console.log(peliculas);
  });

//  ⊂( ・ ̫・)⊃ // espera a que todo el contenido del DOM este cargado//
document.addEventListener('DOMContentLoaded', function () { 
  btnBuscar.addEventListener("click", function() {     //(¬‿¬) se usa addEventListener en el boton de busqueda para que cuando se haga clic, se ejecute esta funcion//
      let buscarPeliculaValor = buscarPelicula.value.toLowerCase(); //  // obtiene el valor del input donde el usuario escribe lo que va a  buscar (╯✧∇✧)╯//
      console.log(buscarPeliculaValor); 
      showList(peliculas, buscarPeliculaValor);  // （⌒▽⌒ゞ llama a showList para mostrar las peliculas//
  });
});

function showList(array, buscarPeliculaValor) {
  container.innerHTML = ""; //(─‿─) limpiamos el contenedor//

  // （−＿−；）filtrar las peliculas que coinciden con la busqueda//
  let filtrado = array.filter(function(element) {
  return element.title.toLowerCase().includes(buscarPeliculaValor) || 
           element.tagline.toLowerCase().includes(buscarPeliculaValor) ||
           element.genres.some(genre=> genre.name.toLowerCase().includes(buscarPeliculaValor)) ||
           element.overview.toLowerCase().includes(buscarPeliculaValor);
  });
  console.log(filtrado);

  //(；☉_☉) recorrer las peliculas filtradas//
  for (let i = 0; i < filtrado.length; i++) {
    let movieItem = document.createElement("li");  //¯\(°_o)/¯ crea un nuevo elemento HTML <li> para cada pelicula//
    movieItem.classList.add("list-group-item", "bg-dark", "text-white"); // (X_X) ☜ (◉▂◉ ) una hora buscando en el codigo del profe //
    
    // (Ｔ▽Ｔ) añadir la informacion de la pelicula title, tagline y estrellas/ 
    movieItem.innerHTML = `
      <h3>${filtrado[i].title}</h3> 
      <p>${filtrado[i].tagline}</p>
      <p>${votoEstrellas(filtrado[i].vote_average)}</p>
    `;
    movieItem.addEventListener('click', () => informacionPelicula(filtrado[i]))  // (⊙_◎) añade un evento al <li> para que, al hacer click, se muestre la funcion informacionPelicula con los datos de la pelicula//
    container.appendChild(movieItem);
  }
  console.log(container); // ———–[]=¤ԅ༼ ･ 〜 ･ ༽╯ verificar si el contenedor contiene los elementos//
}


// (✖╭╮✖) convertir vote_average en formato de estrellas//
function votoEstrellas(vote_average) {
  const estrellas = 5;
  let voto = Math.round((vote_average / 2) * estrellas); // (∩⌣̀_⌣́) primero divide el promedio por 2, luego multiplica por el numero de estrellas 5//
  let vEstrellas = "";                                   // variable vacia para almacenar el HTML las estrellas //
  for (let i = 1; i <= estrellas; i++) {                   // se inicia un bucle que va desde 1 hasta el numero 5 que es el total de estrellas//
    if (i <= voto) {                                        // si el numero es menor o igual que el numero de esttelas 
      vEstrellas += '<span class="fa fa-star checked"></span>';  //se añade una estrella pintada
    } else {                                                    // sino 
      vEstrellas += '<span class="fa fa-star"></span>';         // se añade una estrella sin pintar//
    }
  }
  return vEstrellas;
}


//┌╏✖_✖╏┘ offcanvas con la informacion de la pelicula//


function informacionPelicula(info) {
  // (;ↀ⌓ↀ) crear el div del offcanvas y agregarlo directamente al body//
  const peliOffcanvasHTML = `
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel">${info.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>${info.overview}</p>
        <ul>
          ${info.genres.map(genre => `<li>${genre.name}</li>`).join("")}    <!--muestra la lista de generos de la pelcula utilizando map para crear un elemento <li> por cada genero y usamos el metodo .join("") para convertir ese array en una cadena de texto --> 
        </ul>

        <div class="dropdown-center"> <!-- Agregada la clase para "centrarlo" yo no lo veia y use esto para que se mostrara -->
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#"> Year: ${info.release_date.slice(0,4)}</a></li>   <!-- muestra el año de lanzamiento de la pelicula, extrayendo los primeros 4 (slice(0,4)) caracteres de la fecha-->
            <li><a class="dropdown-item" href="#">Runtime: ${info.runtime}</a></li>
            <li><a class="dropdown-item" href="#">Budged: ${info.budget}</a></li>
             <li><a class="dropdown-item" href="#">Revenue: ${info.revenue}</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  //  ( ･_･)ﾉ⌒●~*  agregar el offcanvas al body//
  document.body.innerHTML += peliOffcanvasHTML;

  // ᗜಠ o ಠ)¤=[]:::::> Mostrar el offcanvas //
  const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasTop"));
  offcanvas.show();
}
//⎧ᴿᴵᴾ⎫◟◟◟◟◟◟◟◟ ❀◟(ó ̯ ò,//