/* =====================================================
   GESTÃO DO CAMPO — script completo (login + dashboard + perfil)
===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ========== LOGIN ========== */
    const botaoEntrar = document.getElementById('botaoEntrar');
    if (botaoEntrar) {
        botaoEntrar.addEventListener('click', function () {
            const usuarioFake = { nome: 'Administrador', email: 'admin@campo.com' };
            localStorage.setItem('gc_sessao', JSON.stringify(usuarioFake));
            window.location.href = 'gestao-do-campo-home.html';
        });
    }

    /* ========== DASHBOARD ========== */
    const btnUsuario = document.getElementById('btnUsuario');
    if (btnUsuario) {
        const sessao = localStorage.getItem('gc_sessao');
        if (!sessao) {
            window.location.href = 'gestao-do-campo-login.html';
            return;
        }
        const usuario = JSON.parse(sessao);

        document.getElementById('nomeUsuario').textContent = usuario.nome;
        document.getElementById('avatarIniciais').textContent =
            usuario.nome.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();

        const hora = new Date().getHours();
        const cumprimento = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
        document.getElementById('saudacaoNome').textContent =
            cumprimento + ', ' + usuario.nome.split(' ')[0] + '!';

        const dropdown = document.getElementById('menuDropdown');
        btnUsuario.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('aberto');
        });
        document.addEventListener('click', function () {
            dropdown.classList.remove('aberto');
        });

        document.getElementById('linkSair').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('gc_sessao');
            window.location.href = 'gestao-do-campo-login.html';
        });

        const links = document.querySelectorAll('.menu-abas a');
        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const secao = link.dataset.secao;
                links.forEach(function (l) { l.classList.remove('ativa'); });
                link.classList.add('ativa');
                document.querySelectorAll('.secao').forEach(function (s) { s.classList.remove('ativa'); });
                const secaoEl = document.getElementById('secao-' + secao);
                if (secaoEl) secaoEl.classList.add('ativa');
            });
        });
    }

    /* ========== PERFIL (ADMIN) ========== */
    const form = document.getElementById('formPerfil');
    if (form) {
        let fotoAtual = null;

        const fotoImg = document.getElementById('fotoPerfil');
        const fotoPh = document.getElementById('fotoPlaceholder');
        const inputFoto = document.getElementById('inputFoto');
        const aviso = document.getElementById('perfilAviso');

        function mostrarFoto(base64) {
            fotoImg.src = base64;
            fotoImg.classList.remove('oculta');
            fotoPh.classList.add('oculta');
        }

        function esconderFoto() {
            fotoImg.src = '';
            fotoImg.classList.add('oculta');
            fotoPh.classList.remove('oculta');
        }

        function aplicarNoMenu(dados) {
            const nomeMenu = document.getElementById('nomeUsuario');
            const avatar = document.getElementById('avatarIniciais');
            const saud = document.getElementById('saudacaoNome');

            if (nomeMenu && dados.nome) nomeMenu.textContent = dados.nome;
            if (avatar) {
                if (dados.foto) {
                    avatar.innerHTML = '<img src="' + dados.foto + '" alt="foto">';
                } else if (dados.nome) {
                    avatar.textContent = dados.nome.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
                }
            }
            if (saud && dados.nome) {
                const h = new Date().getHours();
                const c = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
                saud.textContent = c + ', ' + dados.nome.split(' ')[0] + '!';
            }
        }

        const salvos = JSON.parse(localStorage.getItem('gc_perfil') || 'null');
        if (salvos) {
            document.getElementById('perfilNome').value = salvos.nome || '';
            document.getElementById('perfilEmail').value = salvos.email || '';
            document.getElementById('perfilTelefone').value = salvos.telefone || '';
            if (salvos.foto) { fotoAtual = salvos.foto; mostrarFoto(fotoAtual); }
            aplicarNoMenu(salvos);
        }

        inputFoto.addEventListener('change', function () {
            const arquivo = inputFoto.files[0];
            if (!arquivo) return;
            const leitor = new FileReader();
            leitor.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    canvas.width = 256; canvas.height = 256;
                    const ctx = canvas.getContext('2d');
                    const lado = Math.min(img.width, img.height);
                    ctx.drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, 256, 256);
                    fotoAtual = canvas.toDataURL('image/jpeg', 0.8);
                    mostrarFoto(fotoAtual);
                };
                img.src = e.target.result;
            };
            leitor.readAsDataURL(arquivo);
        });

        document.getElementById('btnRemoverFoto').addEventListener('click', function () {
            fotoAtual = null;
            esconderFoto();
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const dados = {
                nome: document.getElementById('perfilNome').value.trim(),
                email: document.getElementById('perfilEmail').value.trim(),
                telefone: document.getElementById('perfilTelefone').value.trim(),
                foto: fotoAtual
            };
            localStorage.setItem('gc_perfil', JSON.stringify(dados));
            aplicarNoMenu(dados);
            aviso.style.display = 'block';
            setTimeout(function () { aviso.style.display = 'none'; }, 2500);
        });

        const linkPerfil = document.getElementById('linkPerfil');
        if (linkPerfil) {
            linkPerfil.addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('menuDropdown').classList.remove('aberto');
                document.querySelectorAll('.menu-abas a').forEach(function (l) { l.classList.remove('ativa'); });
                document.querySelectorAll('.secao').forEach(function (s) { s.classList.remove('ativa'); });
                document.getElementById('secao-perfil').classList.add('ativa');
            });
        }
    }

});
