# HTML 모션 발표 스타일

Codex에서 한국어 키네틱 타이포그래피, 리본형 강조, 단계별 공개를 적용한 오프라인 HTML 발표자료를 만들 수 있는 스킬입니다. 브라우저에서 바로 열어 볼 수 있는 예제 HTML과 장면 편집 가이드가 포함됩니다.

## 설치

Node.js 20 이상이 필요합니다. GitHub 릴리스의 npm 패키지 파일로 설치할 수 있습니다.

```sh
npx --yes --package=https://github.com/bvcxzzz12-ops/html-motion-style-skill/releases/download/v1.0.0/html-motion-style-skill-1.0.0.tgz -- html-motion-style-skill
```

PowerShell에서 실행 정책 때문에 `npx`가 열리지 않으면 같은 명령에서 `npx.cmd`를 사용하세요.

설치 위치는 `$CODEX_HOME/skills/html-motion-style-skill`이며, `CODEX_HOME`이 설정되지 않았으면 `~/.codex/skills/html-motion-style-skill`을 사용합니다. 같은 이름의 기존 스킬은 그대로 보존합니다.

## 사용

설치 후 새 Codex 대화에서 다음과 같이 요청합니다.

> $html-motion-style-skill로 이 발표 원고를 16:9 오프라인 HTML 발표로 만들어 줘. 주요 문장을 제목으로 쓰고 근거는 클릭할 때 한 단계씩 보여 줘.

설치 폴더의 `assets/deck.html`을 열면 예제를 볼 수 있습니다. 다음·이전 버튼, 화살표 키, 발표 화면 클릭 또는 휠을 사용합니다. Home과 End는 시작과 끝으로 이동하고 F는 전체 화면을 전환합니다.

## 라이선스

MIT. [LICENSE](LICENSE)
