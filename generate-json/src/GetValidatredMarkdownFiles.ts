import {
  IsBoolean,
  IsString,
  validate,
  ValidationError,
} from 'class-validator';
import { File, FrontMatter, MarkdownFile } from './common/types';
import * as MarkdownFileGenerator from './MarkdownFileGenerator';
import readFiles from './readFiles';

class FrontMatterValidator implements FrontMatter {
  constructor(public readonly filePath: string, obj: Record<string, any>) {
    this.title = obj.title;
    this.draft = obj.draft;
  }

  @IsString()
  title: string;

  @IsBoolean()
  draft: boolean;

  public async validate(): Promise<ValidationError[]> {
    return await validate(this, { forbidUnknownValues: true });
  }
}

async function validateMarkdownFiles(
  markdownFiles: MarkdownFile[],
): Promise<MarkdownFile<FrontMatter>[]> {
  const frontMatterValidations = await Promise.all(
    markdownFiles.map((markdownFile) =>
      new FrontMatterValidator(
        markdownFile.filePath,
        markdownFile.frontMatter,
      ).validate(),
    ),
  );
  const errors = frontMatterValidations.filter(
    (validation) => validation.length > 0,
  );
  if (errors.length > 0) {
    throw errors;
  }
  return markdownFiles.map(
    ({ filePath, ...validatedMarkdownFile }) =>
      validatedMarkdownFile as MarkdownFile<FrontMatter>,
  );
}

export default class GetValidatedMarkdownFiles {
  public static async fromDir(dirPath: string) {
    const files = readFiles(dirPath);
    return await GetValidatedMarkdownFiles.fromFiles(files);
  }

  private static async fromFiles(
    files: File[],
  ): Promise<MarkdownFile<FrontMatter>[]> {
    const markdownFiles = files.map((file) =>
      MarkdownFileGenerator.fromFile(file),
    );
    markdownFiles.forEach((markdownFile) => {
      if (markdownFile.frontMatter.draft === undefined) {
        markdownFile.frontMatter.draft = false;
      }
    });
    const validatedMarkdownFiles = await validateMarkdownFiles(markdownFiles);
    return validatedMarkdownFiles;
  }
}
