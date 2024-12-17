export default {
  meta: {
    type: "problem",
    docs: {
      description: "Restrict `useAuth` imports to Auth.provider.tsx",
      category: "Best Practices",
    },
    messages: {
      restrictedImport:
        "`useAuth` can only be imported in `Auth.provider.tsx`.",
    },
    schema: [], // No options
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        // Check if the imported module is `useAuth`
        if (importSource.includes("useAuth")) {
          const fileName = context.getFilename();

          // Check if the current file is NOT 'Auth.provider.tsx'
          console.log({ fileName });
          if (!fileName.endsWith("Auth.provider.tsx")) {
            context.report({
              node,
              messageId: "restrictedImport",
            });
          }
        }
      },
    };
  },
};
