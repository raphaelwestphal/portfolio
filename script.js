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

  // procura o formulário de login
  const form = document.getElementById('formLogin');
  if (!form) return; // se não existe, não é a página de login

  // quando o usuário clica em "Entrar"
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // não deixa a página recarregar

    const email = document.getElementById('inputEmail').value.trim();
    const senha = document.getElementById('inputSenha').value;

    // busca os usuários salvos
    const usuarios = JSON.parse(localStorage.getItem('gc_usuarios'));
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      // login certo: salva a sessão e vai pro dashboard
      localStorage.setItem('gc_sessao', JSON.stringify(usuario));
      window.location.href = 'gestao-do-campo-home.html';
    } else {
      // login errado: mostra mensagem de erro
      document.getElementById('loginErro').style.display = 'block';
    }
  });
}

/* =====================================================
   PÁGINA DO DASHBOARD (HOME)
   ===================================================== */
function paginaDashboard() {
  // verifica se tá logado
  const sessao = localStorage.getItem('gc_sessao');
  if (!sessao) {
    window.location.href = 'gestao-do-campo-login.html';
    return;
  }

  // pega os dados do usuário logado
  const usuario = JSON.parse(sessao);

  /* ----- NOME E AVATAR ----- */
  document.getElementById('nomeUsuario').textContent = usuario.nome;

  const iniciais = usuario.nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  document.getElementById('avatarIniciais').textContent = iniciais;

  /* ----- SAUDAÇÃO (Bom dia / Boa tarde / Boa noite) ----- */
  const hora = new Date().getHours();
  let cumprimento;
  if (hora < 12) cumprimento = 'Bom dia';
  else if (hora < 18) cumprimento = 'Boa tarde';
  else cumprimento = 'Boa noite';

  document.getElementById('saudacaoNome').textContent =
    cumprimento + ', ' + usuario.nome.split(' ')[0] + '!';

  /* ----- DROPDOWN DO USUÁRIO (canto direito) ----- */
  const btnUsuario = document.getElementById('btnUsuario');
  const dropdown = document.getElementById('menuDropdown');

  btnUsuario.addEventListener('click', function (e) {
    e.stopPropagation(); // não deixa o clique de "fora" fechar na hora
    dropdown.classList.toggle('aberto'); // abre ou fecha
  });

  // fecha o dropdown quando clica em qualquer lugar da página
  document.addEventListener('click', function () {
    dropdown.classList.remove('aberto');
  });

  /* ----- BOTÃO SAIR ----- */
  document.getElementById('linkSair').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('gc_sessao'); // apaga a sessão
    window.location.href = 'gestao-do-campo-login.html'; // volta pro login
  });

  /* ----- ABAS DO MENU (Início, Máquinas, Lavouras, etc.) ----- */
  const links = document.querySelectorAll('.menu-abas a');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // qual aba foi clicada?
      const secao = link.dataset.secao; // ex: "maquinas", "lavouras"

      // remove "ativa" de todas as abas
      links.forEach(function (l) {
        l.classList.remove('ativa');
      });

      // adiciona "ativa" só na aba clicada
      link.classList.add('ativa');

      // esconde todas as seções
      document.querySelectorAll('.secao').forEach(function (s) {
        s.classList.remove('ativa');
      });

      // mostra só a seção correspondente
      const secaoElemento = document.getElementById('secao-' + secao);
      if (secaoElemento) secaoElemento.classList.add('ativa');
    });
  });
}

/* =====================================================
   ESPERA A PÁGINA CARREGAR ANTES DE RODAR
   (esse é o truque que resolve o problema)
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {
  paginaLogin();
  paginaDashboard();
});
