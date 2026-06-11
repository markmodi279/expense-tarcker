"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const {
        theme,
        setTheme,
    } = useTheme();

    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm font-medium bg-white text-gray-700 dark:bg-gray-900 dark:text-white"
        >
            <option
                value="light"
                className="bg-white text-black"
            >
                Light
            </option>

            <option
                value="dark"
                className="bg-gray-900 text-white"
            >
                Dark
            </option>

            <option
                value="system"
                className="bg-gray-900 text-white"
            >
                System
            </option>
        </select>
    );
}