/* =====================================================
   GESTÃO DO CAMPO — Script principal
   ===================================================== */

/* ----- SENHA PADRÃO ----- */
/* ACESSO: admin@campo.com / 1234 (troque aqui se quiser) */
function criarUsuarioPadrao() {
  if (!localStorage.getItem('gc_usuarios')) {
    const usuarios = [{ email: 'admin@campo.com', senha: '1234', nome: 'Administrador' }];
    localStorage.setItem('gc_usuarios', JSON.stringify(usuarios));
  }
}

/* =====================================================
   PÁGINA DE LOGIN
   ===================================================== */
function paginaLogin() {
  criarUsuarioPadrao();

  const form = document.getElementById('formLogin');
  if (!form) return; // não existe formulário = não é a página de login

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('inputEmail').value.trim();
    const senha = document.getElementById('inputSenha').value;

    const usuarios = JSON.parse(localStorage.getItem('gc_usuarios'));
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem('gc_sessao', JSON.stringify(usuario));
      window.location.href = 'gestao-do-campo-home.html';
    } else {
      document.getElementById('loginErro').style.display = 'block';
    }
  });
}

/* =====================================================
   PÁGINA DO DASHBOARD (HOME)
   ===================================================== */
function paginaDashboard() {

  /* 🔧 CORREÇÃO DO LOOP:
     Se não existir o botão do usuário na página,
     é porque estamos no LOGIN — então não faz nada aqui. */
  const btnUsuario = document.getElementById('btnUsuario');
  if (!btnUsuario) return;

  // verifica se tá logado (só no home)
  const sessao = localStorage.getItem('gc_sessao');
  if (!sessao) {
    window.location.href = 'gestao-do-campo-login.html';
    return;
  }

  const usuario = JSON.parse(sessao);

  /* ----- NOME E AVATAR ----- */
  document.getElementById('nomeUsuario').textContent = usuario.nome;

  const iniciais = usuario.nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  document.getElementById('avatarIniciais').textContent = iniciais;

  /* ----- SAUDAÇÃO ----- */
  const hora = new Date().getHours();
  let cumprimento;
  if (hora < 12) cumprimento = 'Bom dia';
  else if (hora < 18) cumprimento = 'Boa tarde';
  else cumprimento = 'Boa noite';

  document.getElementById('saudacaoNome').textContent =
    cumprimento + ', ' + usuario.nome.split(' ')[0] + '!';

  /* ----- DROPDOWN DO USUÁRIO ----- */
  const dropdown = document.getElementById('menuDropdown');

  btnUsuario.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('aberto');
  });

  document.addEventListener('click', function () {
    dropdown.classList.remove('aberto');
  });

  /* ----- BOTÃO SAIR ----- */
  document.getElementById('linkSair').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('gc_sessao');
    window.location.href = 'gestao-do-campo-login.html';
  });

  /* ----- ABAS DO MENU ----- */
  const links = document.querySelectorAll('.menu-abas a');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const secao = link.dataset.secao;

      links.forEach(function (l) { l.classList.remove('ativa'); });
      link.classList.add('ativa');

      document.querySelectorAll('.secao').forEach(function (s) {
        s.classList.remove('ativa');
      });

      const secaoElemento = document.getElementById('secao-' + secao);
      if (secaoElemento) secaoElemento.classList.add('ativa');
    });
  });
}

/* =====================================================
   ESPERA A PÁGINA CARREGAR ANTES DE RODAR
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {
  paginaLogin();
  paginaDashboard();
});
