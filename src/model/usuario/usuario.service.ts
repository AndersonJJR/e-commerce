import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criar(dados: CriarUsuarioDTO) {
    const emailExiste = await this.usuarioRepository.findOne({
      where: { email: dados.email },
    });

    if (emailExiste) {
      throw new ConflictException('Email já cadastrado!');
    }

    const usuario = this.usuarioRepository.create(dados);
    await this.usuarioRepository.save(usuario);

    return { id: usuario.id, message: 'Usuário criado com sucesso' };
  }

  async listar() {
    const usuarios = await this.usuarioRepository.find();

    if (usuarios.length === 0) {
      throw new NotFoundException('Não há usuários cadastrados!');
    }

    return usuarios;
  }

  async buscar(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`Usuário de ID ${id} não encontrado`);
    }

    return usuario;
  }

  async atualizar(id: string, dados: AtualizarUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`Usuário de ID ${id} não encontrado`);
    }

    if (dados.email && dados.email !== usuario.email) {
      const emailExiste = await this.usuarioRepository.findOne({
        where: { email: dados.email },
      });
      if (emailExiste) {
        throw new ConflictException('Email já está em uso!');
      }
    }

    Object.assign(usuario, dados);
    await this.usuarioRepository.save(usuario);

    return { message: 'Usuário atualizado com sucesso', id: usuario.id };
  }

  async deletar(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`Usuário de ID ${id} não encontrado`);
    }

    await this.usuarioRepository.delete(id);

    return { message: 'Usuário deletado com sucesso' };
  }
}
