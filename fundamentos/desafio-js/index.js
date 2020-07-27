
function init() {
	/* Busca dados na API */
	BuscaDados();
}

function BuscaDados() {
	fetch('https://igti-film.herokuapp.com/api/accounts')
		.then(dados => dados.json())
		.then(json => questoes(json));
}

function questoes(json) {
	//console.log(json);
	
	Pegunta01(json);
	Pegunta02(json);
	Pegunta03(json);
	Pegunta04(json);
	Pegunta05(json);
	Pegunta06(json);
	Pegunta07(json);
	Pegunta08(json);
	Pegunta09(json);
	Pegunta10(json);
	Pegunta11(json);
	Pegunta12(json);
	
	/* -------------------------------------------
	 * Abaixo, questões teóricas
	 * -------------------------------------------
	 */
	Pegunta13();
	Pegunta14();
	Pegunta15();
}

/* 
 * A Soma total dos depósitos de todas as agências é:
 */
function Pegunta01(json) {
	let total = json.map(el => el.balance)
				.reduce( (acumulador, atual) => acumulador + atual, 0);
	
	console.log('Pergunta 01: A soma total dos depósitos de todas as agências é ', total);
}

/* 
 * O número total de contas com mais de 100 reais de saldo é: 
 */
function Pegunta02(json) {
	let total = json.filter(el => el.balance > 100);
	console.log('Pergunta 02: O número total de contas com mais de 100 reais de saldo é ', total.length);
}

/*
 * O número de contas com mais de 100 reais de saldo na agência 33 é: 
 */
function Pegunta03(json) {
	let total = json.filter(el => el.balance > 100 && el.agencia == 33);
	console.log('Pergunta 03: O número de contas com mais de 100 reais de saldo na agência 33 é ', total.length);
}

/*
 * A agência com maior saldo é a:
 */
function Pegunta04(json) {
	/* Soma o total por agencia */
	let agrupado = AgrupaPorAgencia(json)
		
	/* Ordena DESC */
	let array = Object.keys(agrupado).map((agencia) => agrupado[agencia]);
	let orderedDesc = array.sort( (a, b) => b.total - a.total );
	
	console.log('Pergunta 04: A agência com maior saldo é a ', orderedDesc[0].agencia)
}

/* 
 * A agência com o menor saldo é a 
 */
function Pegunta05(json) {
	/* Soma o total por agencia */
	let agrupado = AgrupaPorAgencia(json)
		
	/* Ordena ASC */
	let array = Object.keys(agrupado).map((agencia) => agrupado[agencia]);
	let orderedAsc = array.sort( (a, b) => a.total - b.total );
	
	console.log('Pergunta 05: A agência com menor saldo é a ', orderedAsc[0].agencia)
}

/* 
 * Considere o cliente com o maior saldo em cada agência (caso haja mais de um cliente com o maior saldo, escolha apenas um). O valor total desses saldos é: 
 */
function Pegunta06(json) {
	/* Primeiro ordena por saldo, agrupado por agência */
	let ordenado = OrdenaPorAgenciaESaldo(json, -1); /* "-1" p/ ordenar DESC */
	
	/* Obtem somente o maior saldo de cada agência */
	let somaDoMaiorSaldoPorAgencia = 0;
	Object.keys(ordenado).forEach(agencia => {
		somaDoMaiorSaldoPorAgencia += ordenado[agencia].contas[0].balance;
	});
	
	console.log('Pergunta 06: Considere o cliente com o maior saldo em cada agência (caso haja mais de um cliente com o maior saldo, escolha apenas um). O valor total desses saldos é ', somaDoMaiorSaldoPorAgencia)
}

/* 
 * O nome do(a) cliente com o maior saldo na agência 10 é: 
 */
function Pegunta07(json) {
	/* Primeiro ordena por saldo, agrupado por agência */
	let ordenado = OrdenaPorAgenciaESaldo(json, -1); /* "-1" p/ ordenar DESC */
	
	/* Já temos as contas ordenadas por saldo DESC, agrupados por agencia, então é só pegar a primeira conta da agencia 10 */
	let clienteComMaiorSaldoAgencia10 = ordenado[10].contas[0].name;
	console.log('Pergunta 07: O nome do(a) cliente com o maior saldo na agência 10 é ', clienteComMaiorSaldoAgencia10);
}

/* 
 * O nome do(a) cliente com o menor saldo na agência 47 é: 
 */
function Pegunta08(json) {
	/* Primeiro ordena por saldo, agrupado por agência */
	let ordenado = OrdenaPorAgenciaESaldo(json, 1); /* "1" p/ ordenar ASC */
	
	/* Já temos as contas ordenadas por saldo ASC, agrupados por agencia, então é só pegar a primeira conta da agencia 47 */
	let clienteComMenorSaldoAgencia47 = ordenado[47].contas[0].name;
	console.log('Pergunta 08: O nome do(a) cliente com o menor saldo na agência 47 é ', clienteComMenorSaldoAgencia47);
}

/* 
 * Você deve mostrar os nomes dos três clientes com menor saldo da agência 47, separados por vírgula e em ordem crescente (do menor para o maior). Qual seria a sua saída do programa? 
 */
function Pegunta09(json) {
	const names = json.filter(acc => acc.agencia == 47)
					  .sort((a, b) => a.balance - b.balance)
					  .filter((acc, idx) => idx < 3)
					  .map(acc => acc.name)
					  .sort();
		
	console.log('Pergunta 09: Você deve mostrar os nomes dos três clientes com menor saldo da agência 47, separados por vírgula e em ordem crescente (do menor para o maior). Qual seria a sua saída do programa? ', names.join(', '));
}

/* 
 * Quantos clientes estão na agência 47? 
 */
function Pegunta10(json) {
	let qtdClientesAg47 = json.filter( conta => conta.agencia == 47).length;
	console.log('Pergunta 10: Quantos clientes estão na agência 47? ', qtdClientesAg47);
}

/* 
 * Quantos clientes que tem Maria no nome estão na agencia 47? 
 */
function Pegunta11(json) {
	/* "includes" é o "contains" do JavaScript */
	let qtdClientesAg47LikeMaria = json.filter( conta => conta.agencia == 47 && conta.name.includes('Maria')).length;
	console.log('Pergunta 11: Quantos clientes que tem Maria no nome estão na agencia 47?', qtdClientesAg47LikeMaria);
}

/* 
 * Considerando que o id deve ser único e é sequencial, qual o próximo id possível para conta? 
 */
function Pegunta12(json) {
	/* Ordena pelo ID DESC */
	let orderByIdDesc = json.sort( (a,b) => b.id - a.id );
	
	let nextId =  orderByIdDesc[0].id + 1;
	console.log('Pergunta 12: Considerando que o id deve ser único e é sequencial, qual o próximo id possível para conta? ', nextId);
}

/* 
 * As linguagens Dart e JavaScript se enquadram em uma categoria de linguagens “mono thread”. As palavras chave abaixo derivam desse conceito, EXCETO: 'FILTER'
 */ 
function Pegunta13() {
	console.log('Pergunta 13: As linguagens Dart e JavaScript se enquadram em uma categoria de linguagens “mono thread”. As palavras chave abaixo derivam desse conceito, EXCETO: ', 'FILTER');
}

/* 
 * Utilizando o Java, caso você queira realizar um filtro em uma coleção, poderá utilizar o conceito de: 
 */
function Pegunta14() {
	console.log('Pergunta 14: Utilizando o Java, caso você queira realizar um filtro em uma coleção, poderá utilizar o conceito de ', 'Stream');
}

/* 
 * Dart é uma linguagem fortemente tipificada, mas que permite que os tipos sejam criados por inferência. Na linha: "var nome = Teste", a variável nome é do tipo: 
 */
function Pegunta15() {	
	console.log('Pergunta 15: Dart é uma linguagem fortemente tipificada, mas que permite que os tipos sejam criados por inferência. Na linha: "var nome = Teste", a variável nome é do tipo ', 'String');
}

function AgrupaPorAgencia(json) {	
	/* Agrupa e soma o total por agência */
	let agrupado = json.map(el => el) // para não dar erro no reduce se o array for vazio
					   .reduce( (acumulador, atual) => {
							if (!acumulador[atual.agencia]) {
								acumulador[atual.agencia] = { agencia: atual.agencia, total: 0, contas: [], }
							}
							acumulador[atual.agencia].total += atual.balance;
							acumulador[atual.agencia].contas.push(atual);
							   
							return acumulador;
						}, { } ); // empty object is the initial value for result object
	return agrupado;
}

/* ascOrDesc:
 *  "+1" = ASC;
 *  "-1" = DESC;
 */
function OrdenaPorAgenciaESaldo(json, ascOrDesc) {
	/* Primeiro agrupa por agência */
	let agrupado = AgrupaPorAgencia(json);
	
	/* Ordena pelo saldo, agrupado por agência */
	Object.keys(agrupado).forEach(agencia => {		
		agrupado[agencia].contas = agrupado[agencia].contas.sort( (a, b) => (a.balance - b.balance) * ascOrDesc ); /* Ordena ASC */
	} );
	
	return agrupado;
}