import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';

@Controller('/carrinho')
export class CarrinhoController {
  @Post('/:id')
  async adicionarAoCarrinho(@Param('id', new ParseUUIDPipe()) id: string) {}
}
