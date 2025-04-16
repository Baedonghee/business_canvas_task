# 🧩 Member Management App

비즈니스 캔버스 과제입니다.
Ant Design 기반 UI와 React + TypeScript + Vite로 구축되었습니다.

---

## 🛠 기술 스택

- ⚛️ React
- ⚡️ Vite
- 🟦 TypeScript
- 💄 Ant Design (antd)
- 🎨 styled-components
- 📦 Custom Storage Utility (`utils/storage.ts`)
- 🧱 Custom UI Components (`components/UI`)

---

## 📁 프로젝트 구조

```bash
src/
├── components/
│ ├── DropdownAndMoreButton/ # More 드랍다운
│ ├── LabelFormField/ # 라벨있는 Form
│ ├── MemberModal/ # 회원 정보 모달
│ └── UI/ # 공통 UI 컴포넌트
    ├── Button/
    ├── Checkbox/
    ├── DatePicker/
    ├── Flex/
    ├── Modal/
    ├── SVG/
    ├── Table/
    │ └── TableFilter/
    ├── Text/
    └── Title/
├── model/
│ └── job-list.ts # 직업 옵션 정의
├── pages/
│ └── Main.tsx # 메인 페이지 (회원 목록)
├── styles/
│ ├── GlobalStyle.ts
│ └── theme.d.ts
├── types/
│ └── user.ts # 사용자 관련 타입 정의
├── utils/
│ ├── mapUserToDataType.tsx # 사용자 데이터를 테이블용으로 변환
│ └── storage.ts # 로컬 스토리지 유틸리티
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## 🚀 시작하기

### 1. 패키지 설치

```bash
yarn install
```

### 2. 개발 서버 실행

```bash
yarn dev
```

### 3. 빌드

```bash
yarn build
```

---

## ⚙️ 환경 변수 설정

루트에 `.env` 파일을 생성하고 다음과 같이 설정하세요:

```env
VITE_STORAGE=in-memory
# 또는 로컬 스토리지를 사용할 경우
# VITE_STORAGE=local-storage
```

---

## 💡 주요 기능

- 회원 목록 출력 및 필터링
- 필터 항목: 이름, 메모, 가입일, 직업, 이메일 수신 동의 여부
- 커스텀 필터 드롭다운 UI
- 회원 정보 추가/수정/삭제
- 로컬 스토리지 기반 데이터 저장
