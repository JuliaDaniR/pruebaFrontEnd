const smflex1 = 'sm:flex-1';

export const controlClasses = {
  controlContainerClasses: `
    flex flex-col mb-3
    sm:flex-row
  `,
  textInputContainerClasses: smflex1,
  radioInputContainerClasses: `
    flex gap-4 
    ${smflex1} sm:justify-between sm:border sm:border-sky-500 sm:rounded-md sm:px-2
  `,
  labelContainerClasses: smflex1,
  labelClasses: `
    text-lg
  `,
  textInputClasses: `
    py-0.5 px-1 text-lg text-black rounded-md border border-sky-500 w-full
  `,
  errorContainerClasses: `
    text-sm text-red-400
  `,
} 