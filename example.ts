// example.ts

export function add(a: number, b: number): number {
    return a + b;
}

// test_example.ts
import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { add } from "./example.ts";

deno.test("addition test", () => {
    assertEquals(add(2, 3), 5);
});
