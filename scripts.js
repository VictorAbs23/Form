//Adiciona Países
document.addEventListener('DOMContentLoaded', function() {
    const nacionalidadeSelect = document.getElementById('nacionalidade');

    // Adiciona uma opção padrão no início
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Selecione uma nacionalidade";
    defaultOption.value = "";
    nacionalidadeSelect.appendChild(defaultOption);

    fetch('https://restcountries.com/v3.1/all?fields=name,translations,cca2')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.translations.por.common.localeCompare(b.translations.por.common));
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.translations.por.common;
                nacionalidadeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching country list:', error);
        });

    // Ouvinte de eventos para a seleção de nacionalidade
    nacionalidadeSelect.addEventListener('change', function() {
        const isBrasil = this.value === 'BR';

        if (isBrasil) {
            removeFields('passaporte', 'validadePassaporte');
            createBrasilFields();
        } else if (this.value) {
            removeFields('rg', 'cpf');
            createPassaporteFields();
        } else {
            removeFields('rg', 'cpf', 'passaporte', 'validadePassaporte');
        }
    });

    // Funções para criar e remover campos...
});

//Lógica 
document.addEventListener('DOMContentLoaded', function() {
    const nacionalidadeSelect = document.getElementById('nacionalidade');
    const form = document.getElementById('registrationForm');

    // Função para criar campos de RG e CPF
    function createBrasilFields() {
        if (!document.getElementById('rg')) { // Verifica se o campo RG já existe
            const rgGroup = document.createElement('div');
            rgGroup.classList.add('form-group');
            rgGroup.innerHTML = `
                <label for="rg">RG</label>
                <input type="text" id="rg" name="rg">
            `;
            form.insertBefore(rgGroup, form.lastElementChild);
        }

        if (!document.getElementById('cpf')) { // Verifica se o campo CPF já existe
            const cpfGroup = document.createElement('div');
            cpfGroup.classList.add('form-group');
            cpfGroup.innerHTML = `
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf">
            `;
            form.insertBefore(cpfGroup, form.lastElementChild);
        }
    }

    // Função para criar campos de Passaporte e Data de Validade
    function createPassaporteFields() {
        if (!document.getElementById('passaporte')) { // Verifica se o campo Passaporte já existe
            const passaporteGroup = document.createElement('div');
            passaporteGroup.classList.add('form-group');
            passaporteGroup.innerHTML = `
                <label for="passaporte">Passaporte</label>
                <input type="text" id="passaporte" name="passaporte">
            `;
            form.insertBefore(passaporteGroup, form.lastElementChild);
        }

        if (!document.getElementById('validadePassaporte')) { // Verifica se o campo Data de Validade já existe
            const validadeGroup = document.createElement('div');
            validadeGroup.classList.add('form-group');
            validadeGroup.innerHTML = `
                <label for="validadePassaporte">Data de validade do Passaporte</label>
                <input type="date" id="validadePassaporte" name="validadePassaporte">
            `;
            form.insertBefore(validadeGroup, form.lastElementChild);
        }
    }

    // Remover campos não necessários
    function removeFields(...fields) {
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.parentElement.remove();
        });
    }

    // Ouvinte de eventos para a seleção de nacionalidade
    nacionalidadeSelect.addEventListener('change', function() {
        const isBrasil = nacionalidadeSelect.value === 'BR'; // Verifica se a nacionalidade é Brasil

        if (isBrasil) {
            removeFields('passaporte', 'validadePassaporte'); // Remove os campos de Passaporte e Data de Validade
            createBrasilFields(); // Cria os campos de RG e CPF
        } else {
            removeFields('rg', 'cpf'); // Remove os campos de RG e CPF
            createPassaporteFields(); // Cria os campos de Passaporte e Data de Validade
        }
    });

});



document.addEventListener('DOMContentLoaded', function() {
    const pcdSelect = document.getElementById('pcd');
    const descricaoDeficienciaGroup = document.getElementById('descricaoDeficienciaGroup');

    pcdSelect.addEventListener('change', function() {
        if (this.value === 'sim') {
            descricaoDeficienciaGroup.style.display = 'block';
        } else {
            descricaoDeficienciaGroup.style.display = 'none';
        }
    });

});

//Adiciona Times
document.addEventListener('DOMContentLoaded', function() {
    const timesFutebol = [
        "Flamengo", "Corinthians", "Barcelona", 
        "Real Madrid", "Manchester United", "Liverpool", 
        "Paris Saint-Germain", "Bayern Munich", "Juventus"
        
    ];

    const selectTimeFutebol = document.getElementById('timeFutebol');

    timesFutebol.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        selectTimeFutebol.appendChild(option);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const selectAcompanhantes = document.getElementById('acompanhantes');
    const grupoQuantidadeAcompanhantes = document.getElementById('quantidadeAcompanhantesGroup');
    const selectQuantidadeAcompanhantes = document.getElementById('quantidadeAcompanhantes');
    const camposAcompanhantes = document.getElementById('acompanhantesCampos');

    selectAcompanhantes.addEventListener('change', function() {
        grupoQuantidadeAcompanhantes.style.display = this.value === 'sim' ? 'block' : 'none';
        camposAcompanhantes.innerHTML = ''; // Limpa os campos adicionais
    });

    selectQuantidadeAcompanhantes.addEventListener('change', function() {
        gerarCamposAcompanhantes(this.value);
    });

    function gerarCamposAcompanhantes(quantidade) {
        camposAcompanhantes.innerHTML = ''; 
        for (let i = 0; i < quantidade; i++) {
            camposAcompanhantes.innerHTML += `

                <h3>Acompanhante ${i + 1}</h3>

                <div class="form-group">
                    <label for="nomeAcompanhante">Nome do Acompanhante</label>
                    <input type="text" id="nomeAcompanhante${i}" name="nomeAcompanhante${i}">
                </div>
                
                <div class="form-group">
                    <label for="sobrenome">Sobrenome</label>
                    <input type="text" id="sobrenome${i}" name="sobrenome">
                </div>

                <div class="form-group">
                    <label for="nascimento">Data de nascimento${i}</label>
                    <input type="date" id="nascimento${i}" name="nascimento">
                </div>

                <div class="form-group">
                    <label for="nacionalidadeAcompanhante${i}">Nacionalidade</label>
                    <select id="nacionalidadeAcompanhante${i}" name="nacionalidadeAcompanhante${i}">
                        <!-- As opções serão adicionadas pelo JavaScript -->
                    </select>
                </div>

        <!-- Campos de RG e CPF -->
            <div class="form-group" id="rgCpfAcompanhante${i}" style="display: none;">
                <label for="rgAcompanhante${i}">RG</label>
                <input type="text" id="rgAcompanhante${i}" name="rgAcompanhante${i}">
                <label for="cpfAcompanhante${i}">CPF</label>
                <input type="text" id="cpfAcompanhante${i}" name="cpfAcompanhante${i}">
            </div>

            <!-- Campos de Passaporte e Data de Validade -->
            <div class="form-group" id="passaporteValidadeAcompanhante${i}" style="display: none;">
                <label for="passaporteAcompanhante${i}">Passaporte</label>
                <input type="text" id="passaporteAcompanhante${i}" name="passaporteAcompanhante${i}">
                <label for="validadePassaporteAcompanhante${i}">Data de validade do Passaporte</label>
                <input type="date" id="validadePassaporteAcompanhante${i}" name="validadePassaporteAcompanhante${i}">
            </div>


                <div class="form-group">
                    <label for="telefone">Telefone</label>
                    <input type="tel" id="telefone${i}" name="telefone">
                </div>

                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email${i}" name="email">
                </div>

                <div class="form-group">
                    <label for="pcdAcompanhante">O acompanhante é uma Pessoa com Deficiência (PCD)?</label>
                        <select id="pcdAcompanhante${i}" name="pcdAcompanhante${i}">
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                </div>

            <div class="form-group" id="descricaoDeficienciaAcompanhanteGroup${i}" style="display: none;">
                <label for="descricaoDeficienciaAcompanhante${i}">Descreva a deficiência</label>
                <textarea id="descricaoDeficienciaAcompanhante${i}" name="descricaoDeficienciaAcompanhante${i}" rows="4" cols="50"></textarea>
            </div>

            <div class="form-group">
                <label for="timeFutebolAcompanhante${i}">Escolha um time de futebol</label>
                <select id="timeFutebolAcompanhante${i}" name="timeFutebolAcompanhante${i}">
                    <option value="">Selecione um time</option>
                    <!-- As opções serão adicionadas pelo JavaScript -->
                </select>
            </div>


            `;
        }
        

        for (let i = 0; i < quantidade; i++) {
            document.getElementById(`pcdAcompanhante${i}`).addEventListener('change', function() {
                const descricaoGroup = document.getElementById(`descricaoDeficienciaAcompanhanteGroup${i}`);
                descricaoGroup.style.display = this.value === 'sim' ? 'block' : 'none';
            });
        }
       
        preencherNacionalidadesAcompanhantes(quantidade);
        preencherTimesFutebolAcompanhantes(quantidade);
        

    }

});

function preencherNacionalidadesAcompanhantes(quantidade) {
    for (let i = 0; i < quantidade; i++) {
        const selectNacionalidade = document.getElementById(`nacionalidadeAcompanhante${i}`);
        // Copia as opções do select principal para cada acompanhante
        document.getElementById('nacionalidade').querySelectorAll('option').forEach(opt => {
            selectNacionalidade.appendChild(opt.cloneNode(true));
        });

        // Adiciona ouvinte de evento para mudança de nacionalidade
        selectNacionalidade.addEventListener('change', function() {
            const isBrasil = this.value === 'BR';
            document.getElementById(`rgCpfAcompanhante${i}`).style.display = isBrasil ? 'block' : 'none';
            document.getElementById(`passaporteValidadeAcompanhante${i}`).style.display = isBrasil ? 'none' : 'block';
        });
    }
}


function preencherTimesFutebolAcompanhantes(quantidade) {
    const timesFutebol = [
        "Flamengo", "Corinthians", "Barcelona", 
        "Real Madrid", "Manchester United", "Liverpool", 
        "Paris Saint-Germain", "Bayern Munich", "Juventus"
        // Adicione mais times conforme necessário
    ];

    for (let i = 0; i < quantidade; i++) {
        const selectTimeFutebol = document.getElementById(`timeFutebolAcompanhante${i}`);
        timesFutebol.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            selectTimeFutebol.appendChild(option);
        });
    }
}


