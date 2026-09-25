
import { useNavigate,useParams } from "react-router"
import type { TipoProdutoJson } from "../../types/types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";




export default function EditarProdutos() {
  document.title = "Editar Produtos"
  //declarando o componente do hook-form
  const { register, handleSubmit, setValues ,reset, formState: { errors } } = useForm<TipoProdutoJson>({
    defaultValues: {
      id: "",
      nome: "",
      preco: 0,
      estoque: 0,
      avatar: ""
    }, mode: "onBlur"
  });
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
        reset(data); // Atualiza os valores do formulário com os 
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
              <input type="text" {...register("nome", { required: "O nome do produto é obrigatório", minLength: { value: 2, message: "O nome do produto deve ter pelo menos 2 caracteres" }, maxLength: { value: 100, message: "O nome do produto não pode exceder 100 caracteres" } })} 
            /> <span>{errors.nome?.message}</span>
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


