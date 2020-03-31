module.exports = {
	root: true,
	env: {
		node: true,
		jest: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'prefer-arrow',
		'jest'
	],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'plugin:jest/recommended'
	],
	rules: {
		/**
		 * Typescript
		 */
		'@typescript-eslint/interface-name-prefix': ['error', {'prefixWithI': 'always'}],
		// '@typescript-eslint/explicit-function-return-type': ['error', {'allowExpressions': true, 'allowTypedFunctionExpressions': true, 'allowHigherOrderFunctions': true}],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        // '@typescript-eslint/indent': [
        //     'error',
        //     'tabs'
        // ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single'
        ],
        '@typescript-eslint/triple-slash-reference': 'error',
		'@typescript-eslint/unified-signatures': 'error',
		/**
		 * Prefer arrow
		 */
		'prefer-arrow/prefer-arrow-functions': 'error',
		/**
		 * Basic
		 */
		'indent': ['error', 'tab'],
		'camelcase': 'error',
        'comma-dangle': ['error', 'never'],
        'complexity': 'off',
        'constructor-super': 'error',
        'dot-notation': 'error',
        'eqeqeq': [
            'error',
            'smart'
        ],
        'guard-for-in': 'error',
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        'max-classes-per-file': [
            'error',
            1
        ],
        'max-len': 'off',
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'error',
        'no-new-wrappers': 'error',
        'no-redeclare': 'error',
        'no-return-await': 'error',
        'no-shadow': [
            'error',
            {
                'hoist': 'all'
            }
        ],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': [
            'error',
            'never'
        ],
        'prefer-const': 'error',
        'radix': 'error',
        'spaced-comment': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'off'
	},
	overrides: [
		// for tests
		{
			files: [
				'*.spec.ts',
				'*.test.ts'
			],
			rules: {
				'dot-notation': 'off' // important for avoiding visibility problems private/protected with class members
			}
		},
		// for test helpers
		{
			files: [
				'*.spec.helper.ts',
				'*.test.helper.ts'
			],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off'
			}
		}
	]
};
