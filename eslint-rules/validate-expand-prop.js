import { ROUTER_PATH_REGEX } from "../src/utils/helpers.util";

/**
 * @fileoverview Ensures the `expand` prop in `LinkRouter` matches the allowed pattern.
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure the `expand` prop in LinkRouter matches the allowed pattern.",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [], // No options required
    messages: {
      invalidExpand:
        'The "expand" prop "{{expandValue}}" does not match the required pattern /^[a-zA-Z0-9-_/*?&=]+$/.',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        // Check if the element is `LinkRouter`
        if (node.name.name !== "LinkRouter") return;

        // Find the `expand` attribute
        const expandAttr = node.attributes.find(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name.name === "expand" &&
            attr.value &&
            attr.value.type === "Literal" // Ensure the value is a literal (e.g., string)
        );

        if (expandAttr) {
          const expandValue = expandAttr.value.value;

          // Validate the `expand` value against the regex
          if (!ROUTER_PATH_REGEX.test(expandValue)) {
            context.report({
              node: expandAttr,
              messageId: "invalidExpand",
              data: {
                expandValue,
              },
            });
          }
        }
      },
    };
  },
};
