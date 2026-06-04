let alumnoActual = null;

function iniciarSesion() {

    const cuenta = document.getElementById("cuenta").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!alumnos[cuenta]) {
        document.getElementById("mensajeError").innerText =
            "Número de cuenta no encontrado";
        return;
    }

    if (alumnos[cuenta].password !== password) {
        document.getElementById("mensajeError").innerText =
            "Contraseña incorrecta";
        return;
    }

    alumnoActual = alumnos[cuenta];

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("panelAlumno").style.display = "block";

    document.getElementById("nombreAlumno").textContent =
        alumnoActual.nombre;

    document.getElementById("cuentaAlumno").textContent =
        cuenta;

    document.getElementById("carreraAlumno").textContent =
        alumnoActual.carrera;

    document.getElementById("ingresoAlumno").textContent =
        alumnoActual.ingreso;

    document.getElementById("semestreActual").textContent =
        alumnoActual.semestreActual;

    cargarSemestres();
}

function cargarSemestres() {

    const select = document.getElementById("semestreSelect");

    select.innerHTML = "";

    Object.keys(alumnoActual.semestres).forEach(semestre => {

        const option = document.createElement("option");

        option.value = semestre;
        option.textContent = semestre;

        select.appendChild(option);
    });

    cargarSemestre();
}

function cargarSemestre() {

    const semestre =
        document.getElementById("semestreSelect").value;

    const materias =
        alumnoActual.semestres[semestre];

    const tabla =
        document.getElementById("tablaCalificaciones");

    tabla.innerHTML = "";

    materias.forEach(materia => {

        let estatus = "";

        if (materia.calificacion === "AC") {

            estatus = "Acreditada";

        } else if (materia.calificacion === "NP") {

            estatus = "No inscrita";

        } else {

            const cal =
                parseFloat(materia.calificacion);

            estatus =
                cal >= 6 ? "Aprobada" : "Reprobada";
        }

        tabla.innerHTML += `
            <tr>
                <td>${materia.codigo}</td>
                <td>${materia.materia}</td>
                <td>${materia.creditos}</td>
                <td>${materia.calificacion}</td>
                <td>${estatus}</td>
            </tr>
        `;
    });
}

function cerrarSesion() {

    alumnoActual = null;

    document.getElementById("panelAlumno").style.display = "none";

    document.getElementById("loginSection").style.display = "flex";

    document.getElementById("cuenta").value = "";
    document.getElementById("password").value = "";

    document.getElementById("mensajeError").innerText = "";
}

function descargarPDF() {

    window.print();
}
