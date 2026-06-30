import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CriarUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do usuário não pode estar vazio!' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido!' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsString()
  @IsOptional()
  telefone: string;
}
