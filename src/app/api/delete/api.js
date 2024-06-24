 const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('../../(auth)/auth/admin/apikey.json');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

app.delete('/api/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await auth.deleteUser(id);
    console.log(`Usuário com UID ${id} deletado do Firebase Authentication.`);
    res.status(200).json({ message: `Usuário com UID ${id} deletado com sucesso do Firebase Authentication.` });
  } catch (error) {
    console.error('Erro ao deletar usuário do Firebase Authentication:', error);
    res.status(500).json({ error: 'Erro ao tentar deletar usuário do Firebase Authentication.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
 