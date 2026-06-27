import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProdutoEntity } from "../produto/entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CarrinhoService {

    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async adicionarAoCarrinho(id: string) {
        const produto = this.produtoRepository.findOne({
            where : {id},
            relations : {
                caracteristicasDoProduto : true
            }
        });
    }
}