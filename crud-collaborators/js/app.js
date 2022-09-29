// Recordar que nuestro arreglo se llama "collaborators"
// Así que debemos buscar en el icono "Storage", la opción "localStorage" y luego click en el http://127.0.0.1:5500

// Operación Read
let showCollaborators = () => {
  let Collaborators = JSON.parse(localStorage.getItem("collaborators"));
  // Verificamos si esta vacio el arreglo
  if (Collaborators === null) {
    //Limpiamos localStorage
    localStorage.setItem("collaborators", JSON.stringify([]));
    Collaborators = [];
  }

  document.getElementsByTagName("tbody")[0].innerHTML = "";
  // Recorremos arreglo
  Collaborators.forEach((element, index) => {
    let tbody = document.createElement("tr");
    tbody.innerHTML = `
        <td scope="row">${index + 1}</td>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.position}</td>
        <td>
            <button type="button" class="btn btn-primary" onclick="showForm(${index})">
                Editar
            </button>
            <button type="button" class="btn btn-danger" onclick="deleteRecord(${index})">
                Eliminar
            </button>
        </td>`;
    document.getElementsByTagName("tbody")[0].appendChild(tbody);
  });
};

// Operación Delete
let deleteRecord = (index) => {
  // Obtener colaboradores
  collaboratorsStorage = JSON.parse(localStorage.getItem("collaborators"));
  // Filtrar colaboradores hasta encontrar el que coincide con el índice
  collaboratorsStorage = collaboratorsStorage.filter(
    (collaborator, i) => i !== index
  );

  localStorage.setItem("collaborators", JSON.stringify(collaboratorsStorage));
  showCollaborators();
};

let showForm = (index) => {
  Collaborators = JSON.parse(localStorage.getItem("collaborators"));

  document.getElementById("index").value = index;
  document.getElementById("firstName").value = Collaborators[index].firstName;
  document.getElementById("lastName").value = Collaborators[index].lastName;
  document.getElementById("position").value = Collaborators[index].position;
};

// Operación Update
let updateRecord = () => {
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let position = document.getElementById("position").value.trim();
  let index = document.getElementById("index").value;

  // Debe seleccionar un registro para actualizar
  if (index == "" || isNaN(index)) {
    alert("Para poder actualizar se debe seleccionar un registro");
    return false;
  }

  // Validar que tengan Nombre(s), Apellidos y Posición

  if (firstName == "" || firstName.length < 1) {
    alert("Nombre(s) no puede quedar vacío");
    document.querySelector("#firstName").focus();
    return;
  }
  if (lastName == "" || lastName.length < 1) {
    alert("Apellidos no puede quedar vacío");
    document.querySelector("#lastName").focus();
    return;
  }
  if (position == "" || position.length < 1) {
    alert("Departamento/Posición no puede quedar vacío");
    document.querySelector("#position").focus();
    return;
  }

  Collaborators = JSON.parse(localStorage.getItem("collaborators"));

  Collaborators[index] = {
    firstName,
    lastName,
    position,
  };

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("position").value = "";

  localStorage.setItem("collaborators", JSON.stringify(Collaborators));

  showCollaborators();
};

// Operación Create
let addRecord = () => {
  Collaborators = JSON.parse(localStorage.getItem("collaborators"));

  const newCollaborator = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    position: document.getElementById("position").value.trim(),
  };

  // Validar que tengan Nombre(s), Apellidos y Posición
  if (newCollaborator.firstName == "" || newCollaborator.firstName.length < 1) {
    alert("Nombre(s) no puede quedar vacío");
    document.querySelector("#firstName").focus();
    return;
  }
  if (newCollaborator.lastName == "" || newCollaborator.lastName.length < 1) {
    alert("Apellidos no puede quedar vacío");
    document.querySelector("#lastName").focus();
    return;
  }
  if (newCollaborator.position == "" || newCollaborator.position.length < 1) {
    alert("Departamento/Posición no puede quedar vacío");
    document.querySelector("#position").focus();
    return;
  }

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("position").value = "";

  Collaborators.push(newCollaborator);

  localStorage.setItem("collaborators", JSON.stringify(Collaborators));

  showCollaborators();
};

let clearLocalStorage = () => {
  // Para limpiar toda la información almacenada en localStorage
  localStorage.clear();
  alert("Se vació la información de localStorage");
  showCollaborators();
};

showCollaborators();
