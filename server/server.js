const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('./registerService');
const { loginUser } = require('./loginService');

const app = express();
app.use(bodyParser.json());

// Rute untuk registrasi pengguna
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const success = await registerUser(email, password);
  if (success) {
    res.status(201).json({ message: 'Registrasi berhasil' });
  } else {
    res.status(500).json({ message: 'Gagal melakukan registrasi' });
  }
});

// Rute untuk login pengguna
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const success = await loginUser(email, password);
  if (success) {
    res.status(200).json({ message: 'Login berhasil' });
  } else {
    res.status(401).json({ message: 'Email atau password salah' });
  }
});

// Port untuk server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
