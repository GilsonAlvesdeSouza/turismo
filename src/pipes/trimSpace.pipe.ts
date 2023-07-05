import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimSpacesPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const trimSpaces = (input: any): any => {
      if (typeof input === 'string') {
        return input.replace(/\s+/g, ' ').trim();
      } else if (typeof input === 'object' && input !== null) {
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            input[key] = trimSpaces(input[key]);
          }
        }
      }
      return input;
    };

    return trimSpaces(value);
  }
}
