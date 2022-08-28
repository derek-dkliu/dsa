import promptSync from "prompt-sync";
import { readFileSync } from "fs";
import { join } from "path";

export function progress(text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(text);
}

export function banner(text, { char = "-", min = 30, center = false } = {}) {
  let title = text.padEnd(min);
  if (center) {
    const len = text.length;
    const margin = Math.ceil((min - len) / 2);
    title = text.padStart(len + margin).padEnd(len + margin * 2);
  }
  const count = Math.min(100, title.length);
  console.log(char.repeat(count));
  console.log(title);
  console.log(char.repeat(count));
}

export function readFileFromPrompt() {
  const prompt = promptSync({ sigint: true });
  const filename = prompt("file: ") + ".txt";
  const file = { name: filename };
  try {
    file.content = readFileSync(join(process.cwd(), "data", filename), "utf8");
    return file;
  } catch (e) {
    console.log("Error:", e.message);
    return null;
  }
}
