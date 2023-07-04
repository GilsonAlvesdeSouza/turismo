import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntOptionalPipe
  implements PipeTransform<string, number | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): number | undefined {
    if (!value) {
      return undefined;
    }

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Invalid integer value for ${metadata.data}`,
      );
    }

    return parsedValue;
  }
}
