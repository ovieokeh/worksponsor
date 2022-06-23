const formatSubstitutions = (value: string, separator = " and ") =>
  Array.isArray(value) ? value.join(separator) : value;

export default function interpolate(
  inputString: string,
  substitutions: { [x: string]: any }
) {
  let outputString = inputString;

  if (typeof outputString === "string") {
    if (typeof substitutions === "object" && substitutions !== null) {
      Object.entries(substitutions).forEach(([key, value]: [string, any]) => {
        if (value === null) return;

        const safeKey = key.replace(/[^a-z0-9_]/gi, key);
        const separator = (outputString.match(
          new RegExp(`%%${safeKey},(.*)?%%`)
        ) || [])[1];
        const isObject = typeof value === "object" && !Array.isArray(value);
        const options = isObject ? value.options : {};

        let replacementString = isObject ? value.value : value;

        if (options.abbr) {
          replacementString = `<abbr title="${options.abbr}" aria-label="${options.abbr}">${replacementString}</abbr>`;
        }

        outputString = outputString.replace(
          new RegExp(`%%${safeKey}(,.*)?%%`, "g"),
          formatSubstitutions(replacementString, separator)
        );
      });
    }

    outputString = outputString.replace(new RegExp(` ?%%[^%%]*%%`, "g"), "");
  }

  return outputString;
}
