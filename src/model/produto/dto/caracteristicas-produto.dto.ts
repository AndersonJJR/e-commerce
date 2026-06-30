import { IsString } from 'class-validator';

export class CaracteristicasProdutoDTO {
  @IsString()
  chave: string;

  @IsString()
  valor: string;
}

export class CaracteristicasProdutoResponseDTO {
  chave: string;
  valor: string;
}
