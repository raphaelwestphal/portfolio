/* =====================================================
   GESTÃO DO CAMPO — Script do sistema (demonstração)
   Sem senha: clica em "Entrar" e já libera o acesso.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ========== TELA DE LOGIN ========== */

    const botaoEntrar = document.getElementById('botaoEntrar');

    if (botaoEntrar) {
        botaoEntrar.addEventListener('click', function () {
            // sessão fake de demonstração
            const usuarioFake = { nome: 'Administrador', email: 'admin@campo.com' };
            localStorage.setItem('gc_sessao', JSON.stringify(usuarioFake));
            window.location.href = 'gestao-do-campo-home.html';
        });
    }

    /* ========== TELA DO DASHBOARD (HOME) ========== */

    const btnUsuario = document.getElementById('btnUsuario');

    if (btnUsuario) {

        // sem sessão? volta pro login (só acontece no home, nunca no login)
        const sessao = localStorage.getItem('gc_sessao');
        if (!sessao) {
            window.location.href = 'gestao-do-campo-login.html';
            return;
        }

        const usuario = JSON.parse(sessao);

        // nome + avatar com iniciais
        document.getElementById('nomeUsuario').textContent = usuario.nome;
        document.getElementById('avatarIniciais').textContent =
            usuario.nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

        // saudação pelo horário
        const hora = new Date().getHours();
        const cumprimento = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
        document.getElementById('saudacaoNome').textContent =
            cumprimento + ', ' + usuario.nome.split(' ')[0] + '!';

        // dropdown do usuário
        const dropdown = document.getElementById('menuDropdown');

        btnUsuario.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('aberto');
        });

        document.addEventListener('click', function () {
            dropdown.classList.remove('aberto');
        });

        // botão Sair
        document.getElementById('linkSair').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('gc_sessao');
            window.location.href = 'gestao-do-campo-login.html';
        });

        // abas do menu
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

                const secaoEl = document.getElementById('secao-' + secao);
                if (secaoEl) secaoEl.classList.add('ativa');
            });
        });
    }

});
