import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsuarioService } from '../model/usuario/usuario.service';
import { CriarUsuarioDTO } from '../model/usuario/dto/criar-usuario.dto';
import { AtualizarUsuarioDTO } from '../model/usuario/dto/atualizar-usuario.dto';
import { ListarUsuarioResponseDTO } from '../model/usuario/dto/listar-usuario.dto';

@Controller('/usuarios')
@UseInterceptors(ClassSerializerInterceptor)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() dados: CriarUsuarioDTO) {
    return await this.usuarioService.criar(dados);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: ListarUsuarioResponseDTO,
    excludeExtraneousValues: true,
  })
  async listar(): Promise<ListarUsuarioResponseDTO[]> {
    return await this.usuarioService.listar();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: ListarUsuarioResponseDTO,
    excludeExtraneousValues: true,
  })
  async buscar(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ListarUsuarioResponseDTO> {
    return await this.usuarioService.buscar(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async atualizar(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dados: AtualizarUsuarioDTO,
  ) {
    return await this.usuarioService.atualizar(id, dados);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deletar(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.deletar(id);
  }
}
