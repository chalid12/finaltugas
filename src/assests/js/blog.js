let dataBlog = [];

function submitBlog(event) {
  event.preventDefault();

  let title = document.getElementById("inputTitle").value;
  let startdate = document.getElementById("startDate").value;
  let enddate = document.getElementById("endDate").value;
  let content = document.getElementById("inputContent").value;
  let nodeJS = document.getElementById("nodeJS").checked;
  let reactJS = document.getElementById("reactJS").checked;
  let nextJS = document.getElementById("nextJS").checked;
  let typeScript = document.getElementById("typeScript").checked;
  let image = document.getElementById("inputImage").files[0];

  if (title === "") {
    return alert("Input Title");
  } else if (content === "") {
    return alert("Input Content");
  } else if (!nodeJS && !reactJS && !nextJS && !typeScript) {
    return alert("Harus memilih minimal satu teknologi!");
  } else if (!image) {
    return alert("Upload Image");
  }

  if (new Date(enddate) < new Date(startdate)) {
    return alert("Masukkan rentang tanggal yang benar");
  }

  let imageURL = URL.createObjectURL(image);

  dataBlog.push({
    title: title,
    startdate: startdate,
    enddate: enddate,
    content: content,
    image: imageURL,
    technologies: {
      nodeJS: nodeJS,
      reactJS: reactJS,
      nextJS: nextJS,
      typeScript: typeScript,
    },
    duration: calculateDuration(startdate, enddate),
  });

  console.log(dataBlog);

  renderBlog();
  clearForm();
}

function calculateDuration(startdate, enddate) {
  let startDate = new Date(startdate);
  let endDate = new Date(enddate);
  let duration = endDate - startDate;
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));
  return `${days} hari`;
}

function clearForm() {
  document.getElementById("inputTitle").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("inputContent").value = "";
  document.getElementById("nodeJS").checked = false;
  document.getElementById("reactJS").checked = false;
  document.getElementById("nextJS").checked = false;
  document.getElementById("typeScript").checked = false;
  document.getElementById("inputImage").value = "";
}

function renderBlog() {
  const contentContainer = document.getElementById("content");
  contentContainer.innerHTML = "";
  dataBlog.forEach((project, index) => {
    contentContainer.innerHTML += `
      <div class="col-md-4">
        <div class="card mb-3 shadow">
          <div class="card-body">
            <img src="${project.image}" alt="image upload" class="img-thumbnail" />
            <h5 class="card-title">${project.title} - ${new Date(project.startdate).getFullYear()}</h5>
            <p class="card-text">Durasi: ${project.duration}</p>
            <p class="card-text">${project.content}</p>
            <p class="card-text">Durasi: ${project.duration}</p>
            <div class="card-text">
              ${project.technologies.nodeJS ? '<i class="fa-brands fa-node-js"></i>' : ""}
              ${project.technologies.reactJS ? '<i class="fa-brands fa-react"></i>' : ""}
              ${project.technologies.nextJS ? '<i class="fa-brands fa-js"></i>' : ""}
              ${project.technologies.typeScript ? '<i class="fa-brands fa-vuejs"></i>' : ""}
            </div>
            <a href="#" class="btn btn-primary me-2">Edit</a>
            <button class="btn btn-danger" onclick="deleteProject(${index})">Hapus</button>
          </div>
        </div>
      </div>`;
  });
}

function deleteProject(index) {
  dataBlog.splice(index, 1);
  renderBlog();
}
