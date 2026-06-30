import { Expose } from 'class-transformer';

export class ListarUsuarioResponseDTO {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  email: string;

  @Expose()
  telefone: string;
}
