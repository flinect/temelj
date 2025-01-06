import { assertEquals } from "@std/assert";
import { z } from "zod";

import { Registry } from "../registry.ts";
import { getValueHelpers } from "./value.ts";
import { getArrayHelpers } from "./array.ts";
import { createHelper } from "../utility.ts";

Deno.test("Handlebars value isEmpty helper", () => {
  const r = new Registry();
  r.registerHelpers({ ...getValueHelpers(), ...getArrayHelpers() });

  assertEquals(r.render("{{isEmpty 0}}"), "true");
  assertEquals(r.render("{{isEmpty undefined}}"), "true");
  assertEquals(r.render("{{isEmpty false}}"), "true");
  assertEquals(r.render("{{isEmpty ''}}"), "true");
  assertEquals(r.render('{{isEmpty ""}}'), "true");

  assertEquals(r.render('{{isEmpty "a"}}'), "false");
  assertEquals(r.render('{{isEmpty " "}}'), "false");
  assertEquals(r.render("{{isEmpty 42}}"), "false");
  assertEquals(r.render("{{isEmpty (array 4 2)}}"), "false");

  r.registerHelper(
    "displayName",
    createHelper()
      .params(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
          age: z.number().optional(),
        }),
      )
      .handle(([user]) => {
        // @ts-expect-error user is typed
        const _user: number = user;

        return `${user.firstName} ${user.lastName}`;
      }),
  );

  // awdawd
});
