import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProdutoEntity } from '../produto/entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarrinhoEntity } from './entities/carrinho.entity';
import { ItemCarrinhoEntity } from './entities/item-carrinho.entity';
import { InjectModel } from '@nestjs/mongoose';
import { HistoricoCarrinho } from './entities/historico-carrinho.schema';
import { Model } from 'mongoose';
import { ProdutoService } from '../produto/produto.service';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(CarrinhoEntity)
    private carrinhoRepository: Repository<CarrinhoEntity>,
    @InjectRepository(ItemCarrinhoEntity)
    private carrinhoItemRepository: Repository<ItemCarrinhoEntity>,
    @InjectModel(HistoricoCarrinho.name, 'analytics')
    private historicoModel: Model<HistoricoCarrinho>,

    private produtoService: ProdutoService,
    private dataSource: DataSource,
  ) {}

  async buscarOuCriarCarrinho(userId: string) {
    let carrinho = await this.carrinhoRepository.findOne({
      where: { userId },
      relations: { 
        items : {
         
          }
       }
    });

    if (!carrinho){
      carrinho = this.carrinhoRepository.create({ userId, items : []});
      await this.carrinhoRepository.save(carrinho);
    }

    return carrinho;
  }
}
