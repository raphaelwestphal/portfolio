/* ===== Gestão do Campo ===== */
/* Login simulado com localStorage */

// cria usuário padrão na primeira vez
function garantirUsuarioPadrao() {
  if (!localStorage.getItem('gc_usuarios')) {
    const usuarios = [{ email: 'admin@campo.com', senha: '1234', nome: 'Administrador' }];
    localStorage.setItem('gc_usuarios', JSON.stringify(usuarios));
  }
}

// ===== LOGIN =====
function iniciarLogin() {
  garantirUsuarioPadrao();
  const form = document.getElementById('formLogin');
  if (!form) return; // não é a página de login

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('inputEmail').value.trim();
    const senha = document.getElementById('inputSenha').value;

    const usuarios = JSON.parse(localStorage.getItem('gc_usuarios'));
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem('gc_sessao', JSON.stringify(usuario));
      window.location.href = 'index.html';
    } else {
      document.getElementById('loginErro').style.display = 'block';
    }
  });
}

// ===== DASHBOARD =====
function iniciarDashboard() {
  // verifica sessão
  const sessao = localStorage.getItem('gc_sessao');
  if (!sessao) {
    window.location.href = 'login.html';
    return;
  }
  const usuario = JSON.parse(sessao);

  // preenche nome e avatar
  document.getElementById('nomeUsuario').textContent = usuario.nome;
  document.getElementById('avatarIniciais').textContent =
    usuario.nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

  // saudação conforme o horário
  const hora = new Date().getHours();
  const cumprimento = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
  document.getElementById('saudacaoNome').textContent =
    cumprimento + ', ' + usuario.nome.split(' ')[0] + '!';

  // dropdown do usuário
  const btn = document.getElementById('btnUsuario');
  const dropdown = document.getElementById('menuDropdown');
  btn.addEventListener('click', function () { dropdown.classList.toggle('aberto'); });

  // sair
  document.getElementById('linkSair').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('gc_sessao');
    window.location.href = 'login.html';
  });

  // troca de abas
  document.querySelectorAll('.menu-abas a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.menu-abas a').forEach(l => l.classList.remove('ativa'));
      link.classList.add('ativa');
      document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
      document.getElementById('secao-' + link.dataset.secao).classList.add('ativa');
    });
  });
}

// inicia conforme a página
iniciarLogin();
iniciarDashboard();
