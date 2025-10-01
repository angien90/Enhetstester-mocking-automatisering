import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            // Inkluderar enbart ShoppingCart.js
            include: ["src/utils/ShoppingCart.js"],
            // Exkludera allt annat
            exclude: ["**/*.vue", "src/views/**", "src/components/**"],
        },
    },
});