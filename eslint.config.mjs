import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import promisePlugin from "eslint-plugin-promise";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: {...globals.browser, ...globals.node},
            parser: tsParser
        },
        plugins: {
            "@typescript-eslint": tseslint,
            "promise": promisePlugin,
            "import": importPlugin
        },
        "settings": {
            "import/resolver": {
                "typescript": {}
            }
        }
        ,
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tseslint.configs['eslint-recommended'].rules,
            ...tseslint.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    argsIgnorePattern: "^_"
                }
            ],
            "@typescript-eslint/explicit-function-return-type": [
                "warn",
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true
                }
            ],
            "@typescript-eslint/no-use-before-define": [
                "error",
                {
                    functions: false,
                    classes: true,
                    variables: true
                }
            ],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-interface": "error",
            "promise/no-return-in-finally": "error",
            "promise/no-promise-in-callback": "warn",
            "import/no-cycle": "error",
            "import/no-unresolved": "error",
            "eqeqeq": "error",
            "prefer-const": "error",
            "camelcase": "error",
            "no-console": "warn",
            "no-debugger": "error",
            "no-unused-vars": ["error", {args: "none"}],
            "no-duplicate-imports": "error",
            "no-else-return": "error",
            "no-process-exit": "error",
            "no-unsafe-finally": "error",
            "no-sync": "warn",
            "no-eval": "error",
            "no-new-wrappers": "error",
            "no-duplicate-case": "error",
            "no-nested-ternary": "error",
            "no-unused-expressions": "error",
            "object-shorthand": "error",
            "prefer-template": "error",
            "consistent-return": "error",
            "prefer-destructuring": [
                "error",
                {
                    object: true,
                    array: false
                },
                {
                    enforceForRenamedProperties: false
                }
            ],
            "complexity": ["error", 15],
            "handle-callback-err": "error",
            "callback-return": "warn",
            "no-process-env": "warn",
            "no-shadow": "error",
            "consistent-this": ["error", "self"],
            "require-await": "error"
        }
    },
    {
        files: ["*.test.ts", "*.spec.ts"],
        rules: {
            "max-len": [
                "warn",
                {
                    code: 200,
                    ignoreComments: true
                }
            ]
        }
    }
];