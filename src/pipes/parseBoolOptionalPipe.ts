import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseBoolOptionalPipe
  implements PipeTransform<string, boolean | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): boolean | undefined {
    if (!value) {
      return undefined; // Retorna undefined se o valor for vazio ou não fornecido
    }

    if (value.toLowerCase() === 'true') {
      return true;
    }

    if (value.toLowerCase() === 'false') {
      return false;
    }

    throw new BadRequestException(`Invalid boolean value for ${metadata.data}`);
  }
}
