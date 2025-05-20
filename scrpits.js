// buscar o cep 
document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepinformado = elemento.value;
    // validar o cep 
    if(!(cepinformado.length === 8))
        return;

    //  fetch de busca no viacep
    fetch(`https://viacep.com.br/ws/${cepinformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.error){    
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;

            }else{
                alert("CEP não encontrado.")
            }

        })
        .catch(error =>console.error("erro ao buscar o CEP: ", error));

    
})

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Coletar os dados dos inputs
    const dadosEndereco = {
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value
    };

    // Converter para JSON e salvar
    localStorage.setItem("endereco", JSON.stringify(dadosEndereco));
    sessionStorage.setItem("endereco", JSON.stringify(dadosEndereco));

    alert("Endereço salvo com sucesso!");
});
window.addEventListener("DOMContentLoaded", () => {
    const enderecoSalvo = JSON.parse(localStorage.getItem("endereco"));

    if (enderecoSalvo) {
        document.getElementById("cep").value = enderecoSalvo.cep || "";
        document.getElementById("logradouro").value = enderecoSalvo.logradouro || "";
        document.getElementById("bairro").value = enderecoSalvo.bairro || "";
        document.getElementById("cidade").value = enderecoSalvo.cidade || "";
        document.getElementById("estado").value = enderecoSalvo.estado || "";
        document.getElementById("numero").value = enderecoSalvo.numero || "";
    }
});

function obterDadosFormulario() {
    return {
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value
    };
}

function salvarFormularioLocal() {
    const dados = obterDadosFormulario();
    localStorage.setItem("endereco", JSON.stringify(dados));
    sessionStorage.setItem("endereco", JSON.stringify(dados));
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", salvarFormularioLocal);
});

document.getElementById("limpar").addEventListener("click", () => {
    // Limpa todos os campos do formulário
    document.querySelector("form").reset();

    // Remove os dados do localStorage e sessionStorage
    localStorage.removeItem("endereco");
    sessionStorage.removeItem("endereco");

    alert("Formulário e dados salvos foram limpos.");
});
