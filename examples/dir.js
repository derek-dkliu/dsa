import fs from "fs";
import { join } from "path";

export function dir(path, parent = "", indent = 0) {
  const fullpath = join(parent, path);
  if (!fs.existsSync(fullpath)) {
    console.log(fullpath, "not exits");
    return;
  }
  if (path === ".git" || path === "node_modules") {
    return;
  }
  const indention =
    "   ".repeat(Math.max(0, indent - 1)) + (indent ? "-- " : "");
  console.log(indention + path);

  const subpaths =
    fs.statSync(fullpath).isDirectory() && fs.readdirSync(fullpath);
  if (subpaths) {
    subpaths.forEach((subpath) => {
      dir(subpath, fullpath, indent + 1);
    });
  }
}
