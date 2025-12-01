/* ============================================================
   5) REGISTRAR EXCLUSÃO LOCAL (FORA DO READY)
============================================================ */
function registrarExclusaoLocal(id) {
    var exclusoes = JSON.parse(localStorage.getItem('exclusoes_locais') || '[]');

    if (!exclusoes.includes(id)) {
        exclusoes.push(id);
        localStorage.setItem('exclusoes_locais', JSON.stringify(exclusoes));
    }

    var arr = JSON.parse(localStorage.getItem('mensagens_local') || '[]');
    arr = arr.filter(m => m.id !== id);

    localStorage.setItem('mensagens_local', JSON.stringify(arr));
    localStorage.setItem('mensagens_local_updated_at', new Date().toISOString());

    loadMensagens();
}


/* ============================================================
   6) CARREGAR MENSAGENS (FORA DO READY)
============================================================ */
function loadMensagens() {
    var exclusoes = JSON.parse(localStorage.getItem('exclusoes_locais') || '[]');

    var mensagensApi = [];
    try {
        var ret = obterMensagens();
        if (Array.isArray(ret)) mensagensApi = ret;
    } catch {}

    var local = JSON.parse(localStorage.getItem('mensagens_local') || '[]');

    var map = {};

    mensagensApi.forEach(function (m) {
        var id = m.id || ("api_" + m.timestamp);
        if (exclusoes.includes(id)) return;
        map[id] = { ...m, id };
    });

    local.forEach(function (m) {
        var id = m.id || ("local_" + m.timestamp);
        if (exclusoes.includes(id)) return;

        if (map[id])
            map[id].visualizada = m.visualizada;
        else
            map[id] = { ...m, id };
    });

    var arr = Object.values(map).sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    localStorage.setItem("mensagens_local", JSON.stringify(arr));
    renderTabela(arr);
}


/* ============================================================
   7) MARCAR COMO VISUALIZADA (FORA)
============================================================ */
function marcarVisualizada(index, valor) {
    var arr = JSON.parse(localStorage.getItem('mensagens_local') || '[]');
    if (!arr[index]) return;

    arr[index].visualizada = !!valor;

    localStorage.setItem('mensagens_local', JSON.stringify(arr));
    localStorage.setItem('mensagens_local_updated_at', new Date().toISOString());

    loadMensagens();
}


/* ============================================================
   8) RENDER TABELA (FORA)
============================================================ */
function renderTabela(mensagens) {
    var $tbody = $('#tabela-mensagens tbody');
    $tbody.empty();

    if (!mensagens.length) {
        $('#msg-count').text("Nenhuma mensagem.");
        return;
    }

    $('#msg-count').text(mensagens.length + " mensagens");

    mensagens.forEach(function (m, idx) {
        var visualizada = m.visualizada === true;
        var bold = visualizada ? "" : "bold";

        var $tr = $('<tr></tr>');
        $tr.append(`<td class="${bold}">${escapeHtml(m.nome)}</td>`);
        $tr.append(`<td class="${bold}">${escapeHtml(m.email)}</td>`);
        $tr.append(`<td class="${bold}">${escapeHtml(m.mensagem)}</td>`);
        $tr.append(`<td>${new Date(m.timestamp).toLocaleString()}</td>`);

        var $acoes = $('<td class="actions"></td>');

        var btnExcluir = $('<button>Excluir</button>').on("click", function () {
            if (confirm("Excluir esta mensagem localmente?")) {
                registrarExclusaoLocal(m.id);
            }
        });

        var btnMark = $('<button></button>')
            .text(visualizada ? "Marcar como não lida" : "Marcar como lida")
            .on("click", function () {
                marcarVisualizada(idx, !visualizada);
            });

        $acoes.append(btnExcluir, btnMark);
        $tr.append($acoes);
        $tbody.append($tr);
    });
}


/* ============================================================
   9) ESCAPE HTML
============================================================ */
function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


/* ============================================================
   10) SINCRONIZAÇÃO ENTRE ABAS (FORA)
============================================================ */
window.addEventListener("storage", function (e) {
    if (e.key === "mensagens_local" || e.key === "mensagens_local_updated_at") {
        loadMensagens();
    }
});


/* ============================================================
   READY — SOMENTE AQUI FICAM EVENTOS E INICIALIZAÇÃO
============================================================ */
$(document).ready(function () {

    var email = localStorage.getItem("admin_email");
    var senha = localStorage.getItem("admin_senha");

    if (!email || !senha) {
        window.location.href = "admin.html";
        return;
    }

    var isLocalValid = (email === adminCorreto.email && senha === adminCorreto.senha);
    var apiValid = false;

    try { apiValid = validarAdmin({ email, senha }); } catch {}

    var isValid = apiValid ? true : isLocalValid;

    if (!isValid) {
        localStorage.removeItem("admin_email");
        localStorage.removeItem("admin_senha");
        window.location.href = "admin.html";
        return;
    }

    loadMensagens();

    $("#btn-refresh").on("click", loadMensagens);

    $('#btn-clear-all').on('click', function () {
        if (!confirm("Excluir TODAS as mensagens localmente?")) return;

        var mensagens = JSON.parse(localStorage.getItem('mensagens_local') || '[]');
        var ids = mensagens.map(m => m.id);

        localStorage.setItem("exclusoes_locais", JSON.stringify(ids));
        localStorage.removeItem("mensagens_local");
        localStorage.setItem("mensagens_local_updated_at", new Date().toISOString());

        loadMensagens();
    });
});