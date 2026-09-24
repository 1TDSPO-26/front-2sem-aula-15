
import { useNavigate,useParams } from "react-router"
import type { TipoProdutoJson } from "../../types/types";
import { useState, useEffect } from "react";


const listaProdutos = [
  { id: 1, nome: "Produto 1", preco: 10.0 },
  { id: 2, nome: "Produto 2", preco: 20.0 },
  { id: 3, nome: "Produto 3", preco: 30.0 },
];

export default function EditarProdutos() {
  document.title = "Editar Produtos"
  // recuperando o id do produto da URL (params)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate();
  const [produto, setProduto] = useState<TipoProdutoJson>({ id: "", nome: "", preco: 0, estoque: 0, avatar: "" })
  useEffect(() => {
    // requisição para o backend apenas uma vez
    const carregarProdutos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/produtos/${id}`);
        if (!response.ok) {
          throw new Error(`Erro produto não encontrado: ${response.status} ${response.statusText}`);
        }
        const data: TipoProdutoJson = await response.json();
        console.log("Produtos carregados:", data);
        setProduto(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    carregarProdutos();
  }, [])

  const handleUpdateProduto = async ()=>{
      try {

        const response = await fetch(`http://localhost:3001/produtos/${produto.id}` , {
          method:"PUT",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(produto)
        });

              if (!response.ok) {
                  throw new Error(`A atualização falhou: ${response.status} - ${response.statusText}`)
              }

              //MSG de SUCESSO
              alert("Atualização realizada com sucesso!");
              //Redirecionando para a página de produtos
              navigate("/produtos");

      } catch (error) {
        console.error(error);
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
              <label htmlFor="nomeProduto">Nome Produto </label>
              <input type="text" name="nome" id="nomeProduto" value={produto.nome}
                onChange={e => setProduto({ ...produto, nome: e.target.value })} />
            </div>
            <div>
              <label htmlFor="preco">Preço R$ </label>
              <input type="number" name="preco" id="preco" value={produto.preco} onChange={e => setProduto({ ...produto, preco: parseInt(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="estoque">Em estoque </label>
              <input type="number" name="estoque" id="estoque" value={produto.estoque} onChange={e => setProduto({ ...produto, estoque: parseInt(e.target.value) })} />
            </div>
            <div>
              <figure>
                <img src={produto.avatar} alt={produto.nome} />
                <figcaption>{produto.nome}</figcaption>
              </figure>
            </div>
            <div>
              <button type="button" onClick={handleUpdateProduto}>Editar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  )
}


