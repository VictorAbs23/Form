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
