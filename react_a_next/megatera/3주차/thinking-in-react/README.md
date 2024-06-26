# 프론트엔드 개발환경 설정하기

## JavaScript 개발 환경 (Node.js) 셋팅

LTS(Long Term Support) 버전을 설치하고 기본으로 사용하게 한다.

```bash
$ brew install fnm
$ fnm install --lts
$ fnm use lts-latest

// Zsh 기준
$ eval "$(fnm env --use-on-cd)"
```

참고 : <https://github.com/Schniz/fnm>

설치된 상태 확인.

```bash
$ fnm list
- v18.17.1 default, lts-latest
- system

$ node -v
v18.17.1
```

## TypeScript + React + Jest + ESLint + Parcel 개발 환경 셋팅

먼저, 적절한 작업 폴더를 준비한다.

```bash
mkdir 프로젝트명
cd 프로젝트명
```

프로젝트 열기

여기서 바로 Visual Studio Code를 열면 편하다.

```bash
code .
```

### **npm 패키지 작업**

```bash
npm init -y
```

### **.gitignore 작업**

```bash
touch .gitignore
```

- 추천
  Node 검색 후 내용 .gitignore에 추가
  [gitignore.io](https://www.toptal.com/developers/gitignore)
  아래 내용이 꼭 포함되어 있는지가 중요!

  ```bash
  /node_modules/
  /dist/
  /.parcel-cache/
  ```

---

### 타입스크립트 설정

```bash
npm i -D typescript

npx tsc --init
```

`tsconfig.json` 파일의 jsx 속성 변경한다. jsx 부분 열어준다.

---

### ESLint 설정

```bash
npm i -D eslint

npx eslint --init
```

```bash
**? How would you like to use ESLint?**
> To check syntax, find problems, and enforce code style

**? What type of modules does your project use?
>** JavaScript modules (import/export)

**? Which framework does your project use? …**
> React

**? Does your project use TypeScript?
>** Yes

? **Where does your code run?**
> Browser

? **How would you like to define a style for your project?**
> Use a popular style guide

**? Which style guide do you want to follow?**
> xo-typescript

**? What format do you want your config file to be in?**
> JavaScript

**? Would you like to install them now?**
> Yes

**? Which package manager do you want to use?**
> npm
```

`.eslintrc.js` 설정 추가

```bash
env: {
  es2021: true,
  node: true,
  jest: true,
},
extends: ["plugin:react/recommended", "plugin:react/jsx-runtime", "xo"],
settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      extends: ["xo-typescript"],
      files: ["*.ts", "*.tsx"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ['error', 2],
    'no-trailing-spaces': 'error',
    curly: 'error',
    'brace-style': 'error',
    'no-multi-spaces': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'no-whitespace-before-property': 'error',
    'func-call-spacing': 'error',
    'space-before-blocks': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-in-parens': ['error', 'never'],
    'block-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { mode: 'strict' }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  },
};
```

`.eslintignore` 작성

- .gitignore 있는것 복사 붙혀넣기
- 아래 내용이 꼭 포함되어 있는지가 중요!

  ```bash
  /node_modules/
  /dist/
  /.parcel-cache/
  ```

`.vscode/settings.json` 작성

```bash
mkdir .vscode
touch .vscode/settings.json
```

```bash
{
    "editor.rulers": [
        80
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "trailing-spaces.trimOnSave": true
}
```

`pacakge.json` 파일에 `lint` 명령 추가:

```bash
{
  "scripts": {
    // ...(전략)...
    "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx ."
  }
}
```

---

### React 설치

```bash
npm i react react-dom
npm i -D @types/react @types/react-dom
```

---

### Jest 설치 (테스팅 도구)

```bash
npm i -D jest @types/jest @swc/core @swc/jest \
    jest-environment-jsdom \
    @testing-library/react @testing-library/jest-dom
```

`jest.config.js` 파일 작성:

```bash
touch jest.config.js
```

```bash
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            jsx: true,
            decorators: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
```

`.eslintrc.js` 파일에 설정 추가:

```bash
module.exports = {
  env: {
    // ...(전략)...
    jest: true,
  },
  // ...(후략)...
};
```

`pacakge.json` 파일에 `test` 명령 추가:

```bash
{
  "scripts": {
    // ...(전략)...
  "test": "jest",
    "coverage": "jest --coverage --coverage-reporters html",
    "watch:test": "jest --watchAll"
  }
}
```

---

### Parcel 설치

```bash
npm i -D parcel
```

`pacakge.json` 파일에 `start` 명령 추가:

```bash
{
  "scripts": {
  "start": "parcel --port 8080",
    "build": "parcel build",
    "check": "tsc --noEmit",
    // ...(후략)...
  }
}
```

zero-configuration이지만, 2가지 정도 작업은 하는게 좋다.

1. `package.json` 파일에 source 속성 추가.

```json
"source": "./index.html",
```

1. [parcel-reporter-static-files-copy](https://github.com/elwin013/parcel-reporter-static-files-copy) 패키지 설치 후 `.parcelrc` 파일 작성.  
   이렇게 하면 static 폴더의 파일을 정적 파일로 Serving할 수 있다(이미지 등 Assets).

```json
npm i -D parcel-reporter-static-files-copy
```

static 안에 이미지 파일 넣으면 됨

```bash
mkdir static
```

```bash
touch .parcelrc
```

`.parcelrc` 파일에 작성:

```json
{
  "extends": ["@parcel/config-default"],
  "reporters": ["...", "parcel-reporter-static-files-copy"]
}
```

빌드 + 정적 서버 실행 방법

```bash
npx parcel build

npx servor ./dist
```

---

### HTML, JSX 준비

기본 코드 작성

- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/Greeting.test.tsx`
- `src/components/Greeting.tsx`

`index.html` 파일 작성:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
```

`src/main.tsx` 파일 작성:

```tsx
import { createRoot } from "react-dom/client";

function main() {
  const element = document.getElementById("root");

  if (!element) {
    return;
  }

  const root = createRoot(element);
  root.render(<App />);
}

main();
```

`src/App.tsx` 파일 작성:

```tsx
import { createRoot } from "react-dom/client";

function main() {
  const element = document.getElementById("root");

  if (!element) {
    return;
  }

  const root = createRoot(element);
  root.render(<App />);
}

main();
```
