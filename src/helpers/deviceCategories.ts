import { CategoryType } from './CategoryType';
import { MultipleFormControlOption } from './MultipleFormControlOption';

export const deviceCategoriesOptions: MultipleFormControlOption<CategoryType>[] = [
  {
    commonName: 'Audiovisual',
    value: 'AUDIOVISUALS',
  },
  {
    commonName: 'Salón',
    value: 'CLASSROOM',
  },
  {
    commonName: 'Material de Laboratorio',
    value: 'LABORATORY_MATERIALS',
  },
  {
    commonName: 'Maquetas',
    value: 'MODELS',
  },
] as const;
