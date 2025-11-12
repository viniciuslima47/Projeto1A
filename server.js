const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======== PESSOAS ======== //
let pessoas = [
    { id: 1, nome: "Pessoa 1" },
    { id: 2, nome: "Pessoa 2" },
    { id: 3, nome: "Pessoa 3" },
];

app.get('/', (req, res) => {
    let dados = { texto: 'ok!' };
    res.render('principal', dados);
});

app.get('/pessoas', (req, res) => {
    res.render('listarPessoas', { pessoas });
});

app.get('/pessoas/nova', (req, res) => res.render('cadastrarPessoa'));

app.post('/pessoas', (req, res) => {
    const { nome } = req.body;
    const novaPessoa = { id: pessoas.length + 1, nome };
    pessoas.push(novaPessoa);
    res.render('listarPessoas', { pessoas });
});

app.get('/pessoas/ver/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pessoa não encontrada');
    res.render('detalharPessoa', { pessoa });
});

app.get('/pessoas/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pessoa não encontrada');
    res.render('editarPessoa', { pessoa });
});

app.post('/pessoas/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pessoa não encontrada');
    pessoa.nome = req.body.nome;
    res.render('listarPessoas', { pessoas });
});

app.post('/pessoas/excluir/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).send('Pessoa não encontrada');
    pessoas.splice(index, 1);
    res.redirect('/pessoas');
});

// ======== VEÍCULOS ======== //
let veiculos = [
    { id: 1, modelo: "BMW I8", placa: "ABC-1234" },
    { id: 2, modelo: "NISSAN GTR", placa: "DEF-5678" },
    { id: 3, modelo: "Mercedes-Benz", placa: "GHI-9012" },
];

// ✅ Rota para listar veículos
app.get('/veiculos', (req, res) => {
    res.render('listarVeiculos', { veiculos });
});

app.get('/veiculos/novo', (req, res) => {
    res.render('cadastrarVeiculo');
});

app.post('/veiculos', (req, res) => {
    const { modelo, placa } = req.body;

    const novoVeiculo = {
        id: veiculos.length + 1,
        modelo,
        placa
    };

    veiculos.push(novoVeiculo);
    res.render('listarVeiculos', { veiculos });
});

app.get('/veiculos/ver/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) return res.status(404).send('Veículo não encontrado');
    res.render('detalharVeiculo', { veiculo });
});

app.get('/veiculos/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) return res.status(404).send('Veículo não encontrado');
    res.render('editarVeiculo', { veiculo });
});

app.post('/veiculos/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) return res.status(404).send('Veículo não encontrado');
    veiculo.modelo = req.body.modelo;
    veiculo.placa = req.body.placa;
    res.render('listarVeiculos', { veiculos });
});

app.post('/veiculos/excluir/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = veiculos.findIndex(v => v.id === id);
    if (index === -1) return res.status(404).send('Veículo não encontrado');
    veiculos.splice(index, 1);
    res.redirect('/veiculos');
});

// ======== SERVIDOR ======== //
app.listen(port, () => {
    console.log(`Servidor em execução: http://localhost:${port}`);
});
