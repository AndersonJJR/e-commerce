import { ArrayMinSize, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { CaracteristicasProdutoDTO } from "./caracteristicas-produto.dto";
import { CATEGORIA_PRODUTO_VALUES } from "../types/categoria-produto.type";
import type { CategoriaProduto  } from "../types/categoria-produto.type";
import { Type } from "class-transformer";

export class CriarProdutoDTO {

    @IsString()
    @IsNotEmpty({ message : "Nome do produto não pode estar vazio!"})
    nome : string;

    @IsString()
    @IsOptional()
    descricao : string;

    @IsNotEmpty()
    @MinLength(10, {message : "Codigo do produto deve haver mais que 10 caracteres"})
    codigoDoProduto : string;

    @IsNumber({} , { message : 'O valor deve ser um número '})
    @Min(0.01 ,{ message : 'O valor deve ser maior que zero '})
    valorProduto : number

    @IsEnum(CATEGORIA_PRODUTO_VALUES ,{
        message: `Categoria invalida, categorias disponiveis: ${CATEGORIA_PRODUTO_VALUES.join(', ')}`
    })
    categoriaProduto : CategoriaProduto;

    @ValidateNested({each : true})
    @Type(() => CaracteristicasProdutoDTO)
    @ArrayMinSize(1)
    @IsOptional()
    caracteristicasDoProduto : CaracteristicasProdutoDTO[];
}