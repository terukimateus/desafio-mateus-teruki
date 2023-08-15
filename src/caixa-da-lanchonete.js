var cardapio = [
    {
        código: 'cafe',
        descricao: 'Café',
        valor: 3.0,
        type: 'principal'
    },
    {
        código: 'chantily',
        descricao: 'Chantily(extra do Café)',
        valor: 1.50,
        type: 'extra'
    },
    {
        código: 'suco',
        descricao: 'Suco Natural',
        valor: 6.20,
        type: 'principal'
    },
    {
        código: 'sanduiche',
        descricao: 'Sanduíche',
        valor: 6.50,
        type: 'principal'
    },
    {
        código: 'queijo',
        descricao: 'Queijo (extra do Sanduíche)',
        valor: 2.0,
        type: 'extra'
    },
    {
        código: 'salgado',
        descricao: 'Salgado',
        valor: 7.25,
        type: 'principal'
    },
    {
        código: 'combo1',
        descricao: '1 Suco e 1 Sanduíche',
        valor: 9.50,
        type: 'combo'
    },
    {
        código: 'combo2',
        descricao: '1 Café e 1 Sanduíche',
        valor: 7.50,
        type: 'combo'
    }
]

function checkItem(item, lista) {
    const codigoItem = item.split(',')[0]; // Pega apenas o código do item
    return lista.some(itensString => itensString.startsWith(codigoItem));
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        var extra = 0
        var valor = 0
        var principal = 0
        var quantidades = {}

        for (const itensString of itens) {
            const [código, quantidade] = itensString.split(',')
            
            const item = cardapio.find(item => item.código === código)


            if (item && quantidade != 0) { 
                valor += item.valor * parseInt(quantidade)

                if (item.type === 'principal') {
                    principal += 1
                } else {
                    if (item.código ===  'chantily') {
                        quantidades['cafe'] = quantidade
                        if (checkItem('cafe', itens)) {
     
                        } else {
                            return 'Item extra não pode ser pedido sem o principal'
                        }
                    } 
                    if (item.código === 'queijo') {
                        quantidades['sanduiche'] = quantidade
                        if (checkItem('sanduiche', itens)) {
                            
                        } else {
                            return 'Item extra não pode ser pedido sem o principal'
                        }
                    }
                }
            } else if (quantidade == 0) {
                return 'Quantidade inválida!'
            } else {
                return 'Item inválido!'
            }

        }
        

        if (metodoDePagamento == 'dinheiro') {
            valor = valor - (valor * 0.05)
        } else if (metodoDePagamento == 'debito') {
            
        } else if (metodoDePagamento == 'credito') {
            valor = valor + (valor * 0.03)
        } else {
            return 'Forma de pagamento inválida!'
        }
        
        valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        if (itens == '') {
            return 'Não há itens no carrinho de compra!'
        } else {
            return valor
        }
    }

}

const teste = new CaixaDaLanchonete()
    .calcularValorDaCompra('dinheiro', ['cafe,1','chantily,1'])


console.log(teste)    
export { CaixaDaLanchonete };
