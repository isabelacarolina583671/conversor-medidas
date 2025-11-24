const unidades = {
  comprimento: {
    metro: 1,
    kilometro: 1000,
    centimetro: 0.01,
    milimetro: 0.001,
    milha: 1609.34,
    jarda: 0.9144,
    pe: 0.3048,
    polegada: 0.0254
  },
  massa: {
    quilograma: 1,
    grama: 0.001,
    miligrama: 0.000001,
    tonelada: 1000,
    libra: 0.453592,
    onca: 0.0283495
  },
  temperatura: {
    celsius: 'C',
    fahrenheit: 'F',
    kelvin: 'K'
  },
  volume: {
    litro: 1,
    mililitro: 0.001,
    metro_cubico: 1000,
    galao: 3.78541,
    pinta: 0.473176
  },
  area: {
    metro_quadrado: 1,
    kilometro_quadrado: 1000000,
    hectare: 10000,
    acre: 4046.86,
    pe_quadrado: 0.092903
  }
};

function atualizarUnidades() {
  const categoria = document.getElementById('categoria').value;
  const unidadeDe = document.getElementById('unidadeDe');
  const unidadePara = document.getElementById('unidadePara');
  
  unidadeDe.innerHTML = '';
  unidadePara.innerHTML = '';
  
  const unidadesCategoria = Object.keys(unidades[categoria]);
  
  unidadesCategoria.forEach(unidade => {
    const option1 = document.createElement('option');
    option1.value = unidade;
    option1.textContent = formatarNomeUnidade(unidade);
    unidadeDe.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = unidade;
    option2.textContent = formatarNomeUnidade(unidade);
    unidadePara.appendChild(option2);
  });
  
  if (unidadesCategoria.length > 1) {
    unidadePara.selectedIndex = 1;
  }
  
  converter();
}

function formatarNomeUnidade(unidade) {
  return unidade.replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

function converter() {
  const valor = parseFloat(document.getElementById('valor').value);
  const categoria = document.getElementById('categoria').value;
  const unidadeDe = document.getElementById('unidadeDe').value;
  const unidadePara = document.getElementById('unidadePara').value;
  const resultadoDiv = document.getElementById('resultadoValor');
  
  if (isNaN(valor) || valor === '') {
    resultadoDiv.textContent = '0';
    return;
  }
  
  let resultado;
  
  if (categoria === 'temperatura') {
    resultado = converterTemperatura(valor, unidadeDe, unidadePara);
  } else {
    const taxaDe = unidades[categoria][unidadeDe];
    const taxaPara = unidades[categoria][unidadePara];
    resultado = (valor * taxaDe) / taxaPara;
  }
  
  resultadoDiv.textContent = resultado.toLocaleString('pt-BR', {
    maximumFractionDigits: 6
  });
}

function converterTemperatura(valor, de, para) {
  let celsius;
  
  if (de === 'celsius') {
    celsius = valor;
  } else if (de === 'fahrenheit') {
    celsius = (valor - 32) * 5/9;
  } else if (de === 'kelvin') {
    celsius = valor - 273.15;
  }
  
  if (para === 'celsius') {
    return celsius;
  } else if (para === 'fahrenheit') {
    return celsius * 9/5 + 32;
  } else if (para === 'kelvin') {
    return celsius + 273.15;
  }
}

function limpar() {
  document.getElementById('valor').value = '';
  document.getElementById('resultadoValor').textContent = '0';
  document.getElementById('categoria').selectedIndex = 0;
  atualizarUnidades();
}

// Inicializar ao carregar
window.onload = function() {
  atualizarUnidades();
};