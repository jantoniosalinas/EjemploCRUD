// Evento para crear un libro
document.getElementById("form").addEventListener("submit", createBook);

// Función crear
function createBook(e) {
  //Leer los valores almacenados en localStorage
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;
  amount = document.getElementById("amount").value;

  // Validar que tengan valor el titulo, descripción y monto
  if (title == "" || title.length < 1) {
    alert("Título no puede quedar vacío");
    document.querySelector("#title").focus();
    return;
  }
  if (description == "" || description.length < 1) {
    alert("Descripción no puede quedar vacío");
    document.querySelector("#description").focus();
    return;
  }
  if (amount == "" || amount.length < 1) {
    alert("Precio no puede quedar vacío");
    document.querySelector("#amount").focus();
    return;
  }

  // Definir el objeto book
  let book = {
    title,
    description,
    amount,
  };

  //Verificar si hay algo almacenado en localStorage en la llave Books
  if (localStorage.getItem("Books") === null) {
    // Si no hay elementos, entonces definimos el arreglo books y agregamos el objeto book
    let books = [];
    books.push(book);
    // A la llave Books, le asignamos el valor del arreglo books
    localStorage.setItem("Books", JSON.stringify(books));
  } else {
    // Si hay elementos asignamos al arreglo books el contenido de la llave Books
    let books = JSON.parse(localStorage.getItem("Books"));
    // Al arreglo books agregamos el objeto book
    books.push(book);
    // A la llave Books, le asignamos el valor del arreglo books
    localStorage.setItem("Books", JSON.stringify(books));
  }
  // Leer el contenido de localStorage
  readLocalStorage();
  // Limpiar la forma
  document.getElementById("form").reset();
  e.preventDefault();
}

// funcion leer
function readLocalStorage() {
  // Leer el contenido de localStorage
  let books = JSON.parse(localStorage.getItem("Books"));
  // Limpiamos el contenido del elemento book-list
  document.getElementById("book-list").innerHTML = "";
  // Recorrer al arreglo books y asignar el resultado al elemento book-list
  for (let i = 0; i < books.length; i++) {
    let title = books[i].title;
    let description = books[i].description;
    let amount = books[i].amount;

    document.getElementById("book-list").innerHTML += `<tr>
                                                            <td>${title}</td>
                                                            <td>${description}</td>
                                                            <td>${amount}</td>
                                                            <td><button onclick="trashBook('${title}')" class="btn btn-danger">Eliminar</button></td>
                                                            <td><button onclick="editBook('${title}')" class="btn btn-success">Editar</button></td>
                                                       </tr>`;
  }
}

// funcion editar
function editBook(title) {
  // Leer el contenido de localStorage
  let books = JSON.parse(localStorage.getItem("Books"));
  // Recorrer al arreglo books y cuando el título sea igual al buscado entonces al elemento body asignar los elementos a cambiar
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === title) {
      document.getElementById("body").innerHTML = `<div class="row">
               <div class="col-md-5">
                   <div class="card">
                       <div class="card-header">
                           <h2>Editando libro ${title}</h2>
                       </div>
                       <div class="card-body">
                           <form>
                               <div class="form-group">
                                   <input type="text" name="#new-title" id="new-title" class="form-control my-3" placeholder="${books[i].title}">
                               </div>
                               <div class="form-group">
                                   <textarea name="#new-description" id="new-description" class="form-control my-3" placeholder="${books[i].description}"></textarea>
                               </div>
                               <div class="form-group">
                                   <input type="number" name="#new-amount" id="new-amount" class="form-control my-3" placeholder="${books[i].amount}">
                               </div>
                               </form>
                               <button class="btn btn-success" onclick="updateBook('${i}')">Actualizar</button>
                               <button class="btn btn-primary" onclick="mainView()">Cancelar</button>
                       </div>
                   </div>
               </div>
               <div class="col-md-6">
                   <table class="table caption-top bg-light">
                       <thead>
                         <tr>
                           <th scope="col">Título</th>
                           <th scope="col">Descripción</th>
                           <th scope="col">Precio</th>
                         </tr>
                       </thead>
                       <tbody id="book-list">
                       </tbody>
                   </table>
               </div>
           </div>`;
    }
  }
}
// Funcion actualizar
function updateBook(i) {
  //Leer los valores almacenados en localStorage
  let books = JSON.parse(localStorage.getItem("Books"));

  // Obtener los valores nuevos
  let title = document.getElementById("new-title").value;
  let description = document.getElementById("new-description").value;
  let amount = document.getElementById("new-amount").value;

  // Validar que tengan valor el titulo, descripción y monto
  if (title == "" || title.length < 1) {
    alert("Título no puede quedar vacío");
    document.querySelector("#title").focus();
    return;
  }
  if (description == "" || description.length < 1) {
    alert("Descripción no puede quedar vacío");
    document.querySelector("#description").focus();
    return;
  }
  if (amount == "" || amount.length < 1) {
    alert("Precio no puede quedar vacío");
    document.querySelector("#amount").focus();
    return;
  }

  // Almacenar los valores en el arreglo books
  books[i].title = title;
  books[i].description = description;
  books[i].amount = amount;

  // Almacenar el array en localStorage
  localStorage.setItem("Books", JSON.stringify(books));
  // Enviar a la vista principal
  mainView();
}

// funcion Eliminar
function trashBook(title) {
  let books = JSON.parse(localStorage.getItem("Books"));
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === title) {
      books.splice(i, 1);
    }
  }
  localStorage.setItem("Books", JSON.stringify(books));
  readLocalStorage();
}

// function Vista Principal
function mainView() {
  // Generar el esquema y enviar el resultado a book-list
  document.getElementById("body").innerHTML = `
    <div class="row">
        <div class="col-md-5">
            <div class="card">
                <div class="card-header">
                    <h2>Agregar nuevo libro</h2>
                </div>
                <div class="card-body">
                    <form id="form">
                        <div class="form-group">
                            <input type="text" id="title" class="form-control my-3" placeholder="Ingresar título">
                        </div>
                        <div class="form-group">
                            <textarea id="description" class="form-control my-3" placeholder="Ingresar descripción"></textarea>
                        </div>
                        <div class="form-group">
                            <input type="number" id="amount" class="form-control my-3" placeholder="Ingresar precio">
                        </div>
                            <button type="submit" class="btn btn-primary">Agregar</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <table class="table caption-top bg-light">
                <thead>
                <tr>
                    <th scope="col">Título</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                </tr>
                </thead>
                <tbody id="book-list">
                </tbody>
            </table>
        </div>
    </div>`;
  // Leer la información de localStorage
  readLocalStorage();
}

readLocalStorage();
