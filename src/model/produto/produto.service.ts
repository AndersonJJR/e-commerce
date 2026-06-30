import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarProdutoDTO } from './dto/criar-produto.dto';
import { ProdutoEntity } from './entities/produto.entity';
import { CaracteristicasProduto } from './entities/caracteristicas-produto.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizarProdutoDTO } from './dto/atualizar-produto.dto';
import { ListarProdutosResponseDTO } from './dto/listar-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criarProduto(dadosProduto: CriarProdutoDTO) {
    const caracteristicas = dadosProduto.caracteristicasDoProduto.map(
      (carac) => {
        const caracteristica = new CaracteristicasProduto();
        caracteristica.chave = carac.chave;
        caracteristica.valor = carac.valor;
        return caracteristica;
      },
    );

    const produto = this.produtoRepository.create({
      nome: dadosProduto.nome,
      descricao: dadosProduto.descricao,
      codigoDoProduto: dadosProduto.codigoDoProduto,
      valorProduto: dadosProduto.valorProduto,
      categoriaProduto: dadosProduto.categoriaProduto,
      caracteristicasDoProduto: caracteristicas,
      status: true,
    });

    await this.produtoRepository.save(produto);

    return { id: produto.id, message: 'Produto criado' };
  }

  async listarProdutos() {
    const produtos = await this.produtoRepository.find();
    if (produtos.length === 0) {
      throw new NotFoundException('Não há produtos cadastrados!');
    }
    return produtos;
  }

  async atualizarProdutos(
    id: string,
    dadosAtualizarProduto: AtualizarProdutoDTO,
  ) {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        caracteristicasDoProduto: true,
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto de id ${id} não encontrado`);
    }

    Object.assign(produto, dadosAtualizarProduto);

    if (dadosAtualizarProduto.caracteristicasDoProduto) {
      produto.caracteristicasDoProduto =
        dadosAtualizarProduto.caracteristicasDoProduto.map((p) => {
          const caracteristica = new CaracteristicasProduto();
          caracteristica.chave = p.chave;
          caracteristica.valor = p.valor;

          return caracteristica;
        });

      await this.produtoRepository.save(produto);

      return { message: 'Produto atualizado com sucesso ', id: produto.id };
    }
  }

  async deletarProduto(id: string) {
    await this.produtoRepository.delete({ id });

    return { message: 'Produto deletado com sucesso' };
  }

  async buscarProduto(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException(`Não há produto com esse ${id}`);
    }

    return produto;
  }

  async desabilitarProduto(id: string) {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        caracteristicasDoProduto: true,
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto de ID ${id} não encontrado`);
    }

    if (produto.caracteristicasDoProduto) {
      await this.produtoRepository.softRemove(produto.caracteristicasDoProduto);
    }

    await this.produtoRepository.softDelete(id);

    return { message: 'Produto desativado com sucesso!' };
  }

  async habilitarProduto(id: string) {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        caracteristicasDoProduto: true,
      },
      withDeleted: true,
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ${id} não encontrado`);
    }

    if (!produto.deletedAt) {
      throw new BadRequestException(`Produto com ${id} não esta excluido`);
    }

    await this.produtoRepository.restore(id);

    return { message: `Produto de ID ${id} foi restaurado com sucesso` };
  }

  async listarDesabilitados(): Promise<ListarProdutosResponseDTO[]> {
    return await this.produtoRepository.find({
      where: { deletedAt: Not(IsNull()) },
      withDeleted: true,
    });
  }
}
