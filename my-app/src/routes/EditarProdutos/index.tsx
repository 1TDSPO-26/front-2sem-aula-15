import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProdutoJ } from "../../types/types";

//TAREFA 1: para a AULA do dia 16/09/2026
//Recuperar o produto selecionado em Produtos que envia o id do produto
// Você deve utilizar os parâmetros do react-router
// e o id do produto para o componente EditarProdutos
// Você deve utilizar os HOOK useParams para recuperar o id do produto, o HOOK useState para armazenar o produto e o HOOK useEffect para atualizar o produto quando o id mudar.






export default function EditarProdutos() {
  //Modificar o título da página;
  document.title = "Editar Produtos";

  const navegate = useNavigate();

  //Recuperar o parametro da rota com o hook useParams, desestruturando o objeto
  const { id } = useParams<{id:string}>();

  //criando o rece
  const [produto, setProduto] = useState<TipoProdutoJ>({id: "", nome:"", preco:0, estoque:0, avatar:""});

  useEffect(() => {
          //Simulando a requisição para o backend
  
          const carregaProduto = async () => {
  
              try {
  
                  const resposta = await fetch(`http://localhost:3001/produtos/${id}`);
  
                  if (!resposta.ok) {
                      throw new Error(`Produto nao encontrado: ${resposta.status} - ${resposta.statusText}`)
                  }
  
                  const data: TipoProdutoJ = await resposta.json();
                  console.log(data);
                  setProduto(data);
  
              } catch (error) {
                  console.error(error);
              }
          }
  
          carregaProduto();
  
      }, []);

  const handleUpdate = async ()=>{
    try {
      
      const response = await fetch(`http://localhost:3001/produtos/${produto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      })

      if(!response.ok){
        throw new Error(`A atualização falhou: ${response.status} - ${response.statusText}`)
      }

      //msg de sucesso
      alert("Atualização realizada com sucesso!")
      navegate("/produtos")

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h2>Editar Produtos</h2>
      <div>
        <form>
          <fieldset>
            <legend>Dados do Produto</legend>
            <div>
              <label htmlFor="nomeProduto">Nome Produto</label>
              <input type="text" name="nome" id="nomeProduto" value={produto.nome} 
              onChange={e => setProduto({...produto,nome:e.target.value})} />
            </div>
            <div>
              <label htmlFor="preco">Preco R$</label>
              <input type="number" name="preco" id="preco" value={produto.preco}
              onChange={e => setProduto({...produto,preco:parseInt(e.target.value)})} />
            </div>
            <div>
              <label htmlFor="estoque">Em Estoque</label>
              <input type="number" name="estoque" id="estoque" value={produto.estoque}
              onChange={e => setProduto({...produto,estoque:parseInt(e.target.value)})}/>
            </div>
            <div>
              <figure>
                <img src={produto.avatar} alt={produto.nome} />
                <figcaption>{produto.nome}</figcaption>
              </figure>
            </div>
            <div>
              <button type="button" onClick={handleUpdate}>Editar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  )
}
