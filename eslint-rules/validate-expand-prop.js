const ROUTER_PATH_REGEX = /^[a-zA-Z0-9-_/*?&=]+$/;

/**
 * @fileoverview Ensures the `expand` prop in `RouterLink and RouterNavLink` matches the allowed pattern.
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure the `expand` prop in RouterLink and RouterNavLink matches the allowed pattern.",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [], // No options required
    messages: {
      invalidExpand: `La prop "expand" con el valor: "{{expandValue}}"  no es pemitida por el patron regex: /^[a-zA-Z0-9-_/*?&=]+$/.`,
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        // Check if the element is 'RouterLink and RouterNavLink'
        if (
          node.name.name !== "RouterLink" &&
          node.name.name !== "RouterNavLink"
        )
          return;

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
