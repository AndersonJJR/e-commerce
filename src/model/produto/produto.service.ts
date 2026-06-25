import { Injectable } from "@nestjs/common";
import { CriarProdutoDTO } from "./dto/criar-produto.dto";
import { ProdutoEntity } from "./entities/produto.entity";
import { v4 as uuid } from "uuid";
import { CaracteristicasProduto } from "./entities/caracteristicas-produto.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProdutoService {

    constructor (
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository : Repository<ProdutoEntity>
    ) {}

    async criarProduto(dadosProduto : CriarProdutoDTO){

        const produto = new ProdutoEntity();
        produto.id = uuid();
        produto.nome = dadosProduto.nome;
        produto.descricao = dadosProduto.descricao;
        produto.codigoDoProduto = dadosProduto.codigoDoProduto;
        produto.valorProduto = dadosProduto.valorProduto;
        produto.categoriaDoProduto = dadosProduto.categoriaProduto;
        produto.caracteristicasDoProduto = dadosProduto.caracteristicasDoProduto.map(item => {
            const caracteristica = new CaracteristicasProduto();
            caracteristica.id = uuid();
            caracteristica.chave = item.chave;
            caracteristica.valor = item.valor;
            
            return caracteristica;
        });
        produto.status = true;

        this.produtoRepository.save(produto);
        
        return { id : produto.id , message : 'Produto criado'}
    }
}