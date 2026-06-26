import { Expose, Type } from "class-transformer";
import { CategoriaProduto } from "../types/categoria-produto.type";
import { CaracteristicasProdutoResponseDTO } from "./caracteristicas-produto.dto";

export class BuscarProdutoResponseDTO {

    @Expose()
    id : string;
    @Expose()
    nome : string;
    @Expose()
    descricao : string;
    @Expose()
    valorProduto : number;

}

export class ListarProdutosResponseDTO{
    @Expose()
    id : string;

    @Expose()
    nome : string;
    @Expose()
    descricao : string;

    codigoDoProduto : string;

    @Expose()
    valorProduto : number;

    categoriaProduto : CategoriaProduto;

    @Type(() => CaracteristicasProdutoResponseDTO)
    caracteristicasDoProduto : CaracteristicasProdutoResponseDTO[];
    
}