import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, comparePassword } from "../../../src/utils/password.util";

describe("password.util", () => {
  const password1 = "ClaveUno123!";
  const password2 = "ClaveDos456!";
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  describe("Generación de hashes", () => {
    it("hash1 es una cadena no vacía y distinta de password1", () => {
      expect(typeof hash1).toBe("string");
      expect(hash1.length).toBeGreaterThan(0);
      expect(hash1).not.toBe(password1);
    });

    it("hash2 es una cadena no vacía y distinta de password2", () => {
      expect(typeof hash2).toBe("string");
      expect(hash2.length).toBeGreaterThan(0);
      expect(hash2).not.toBe(password2);
    });
  });

  describe("Contraseña correcta", () => {
    it("devuelve true con la contraseña correcta", async () => {
      expect(await comparePassword(password1, hash1)).toBe(true);
      expect(await comparePassword(password2, hash2)).toBe(true);
    });
  });

  describe("Contraseña incorrecta", () => {
    it("devuelve false con la contraseña equivocada", async () => {
      expect(await comparePassword(password2, hash1)).toBe(false);
      expect(await comparePassword(password1, hash2)).toBe(false);
    });
  });
});
