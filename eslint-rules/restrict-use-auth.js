export default {
  meta: {
    type: "problem",
    docs: {
      description: "Restrict `useAuth` imports to AuthProvider.tsx",
      category: "Best Practices",
    },
    messages: {
      restrictedImport:
        'El hook "useAuth" solo puede ser importado en: "AuthProvider.tsx".',
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
          if (!fileName.endsWith("AuthProvider.tsx")) {
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
