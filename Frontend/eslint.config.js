/**
 * ESLint configuration for TypeScript with React and related plugins.
 *
 * This configuration sets up ESLint for TypeScript projects, including React, React Hooks, 
 * React Refresh, and TypeScript specific rules.
 * 
 * - Extends recommended ESLint rules for JavaScript and TypeScript.
 * - Specifies the use of the React and React Hooks ESLint plugins.
 * - Configures ESLint to parse TypeScript files (`.ts` and `.tsx`).
 * - Adds language options for ECMAScript 2020 and browser global variables.
 * - Customizes the rules for React Refresh to warn when components are not properly exported.
 * 
 * @module eslint-config
 * @example
 * // Use this configuration file to set up ESLint in your TypeScript + React project.
 * import tseslint from 'eslint-config';
 * export default tseslint.config({...});
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/**
 * Default ESLint configuration for TypeScript React projects.
 * 
 * @function
 * @returns {object} ESLint configuration object.
 * @see {@link https://eslint.org/docs/user-guide/configuring ESLint Configuration Docs}
 */
export default tseslint.config(
  { ignores: ['dist'] }, // Ignore files in the 'dist' directory.
  {
    extends: [
      js.configs.recommended, // Use recommended JavaScript ESLint rules.
      ...tseslint.configs.recommended, // Extend TypeScript-specific recommended rules.
    ],
    files: ['**/*.{ts,tsx}'], // Apply to all TypeScript and TypeScript React files.
    languageOptions: {
      ecmaVersion: 2020, // Set ECMAScript version to 2020 (ES11).
      globals: globals.browser, // Add browser global variables (e.g., `window`, `document`).
    },
    plugins: {
      'react-hooks': reactHooks, // Add the react-hooks plugin to enforce React Hooks best practices.
      'react-refresh': reactRefresh, // Add the react-refresh plugin for React Fast Refresh support.
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Include recommended React Hooks rules.
      'react-refresh/only-export-components': [
        'warn', // Warn when components are not properly exported.
        { allowConstantExport: true }, // Allow exporting constants without components.
      ],
    },
  },
);
