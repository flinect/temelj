/**
 * This module provides a collection of functions for generating unique identifiers.
 *
 * ```ts
 * import { generateUlid } from "@flinect/temelj/id";
 * import { assertNotEquals } from "@std/assert";
 *
 * assertNotEquals(generateUlid(), generateUlid());
 * ```
 *
 * @module
 */

export * from "~/id/ulid.ts";
export * from "~/id/uuid4.ts";
