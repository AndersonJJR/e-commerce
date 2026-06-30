import { PartialType } from '@nestjs/mapped-types';
import { CriarProdutoDTO } from './criar-produto.dto';

export class AtualizarProdutoDTO extends PartialType(CriarProdutoDTO) {}
