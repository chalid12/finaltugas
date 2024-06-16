const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

// Menyediakan akses statis ke assets
app.use("/assests", express.static(path.join(__dirname, "src/assests")));

// Middleware untuk parsing body dari POST request
app.use(express.urlencoded({ extended: false }));

// Konfigurasi view engine dan lokasi views
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Array untuk menyimpan entri blog
let dataBlog = [];

// Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/blog", (req, res) => {
  res.render("blog", { dataBlog });
});

app.get("/add-blog", (req, res) => {
  res.render("add-blog");
});

app.post("/add-blog", (req, res) => {
  const { title, content } = req.body;
  const newBlog = { title, content };
  dataBlog.unshift(newBlog); // Menambahkan data baru ke awal array
  res.redirect("/blog"); // Redirect ke halaman blog setelah menambahkan
});

app.get("/blog-detail/:id", (req, res) => {
  const { id } = req.params;
  const detail = dataBlog[id];
  res.render("blog-detail", { detail });
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
