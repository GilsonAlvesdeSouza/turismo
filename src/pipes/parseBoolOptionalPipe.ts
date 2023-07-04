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
      return undefined;
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
