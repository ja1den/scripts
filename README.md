# Scripts

> My scripts and other utilities.

## Introduction

This is a collection of small things that aren't big enough for their own project.

## Usage

Everything in this repository can be run with [npm](https://www.npmjs.com/).

```sh
npm start
```

For ease of development, scripts can also be run through the CLI.

```sh
npm start <action> <script>
```

---

Every script must begin with a shebang.

| Language   | Shebang                  |
| ---------- | ------------------------ |
| JavaScript | `#!/usr/bin/env node`    |
| TypeScript | `#!/usr/bin/env ts-node` |
| Bash       | `#!/usr/bin/env bash`    |
| Python     | `#!/usr/bin/env python3` |

---

The execute permission must be set on each script (`744`).

```sh
npm run chmod
```

The `chmod` script will update script permissions recursively.

## License

[MIT](LICENSE)
