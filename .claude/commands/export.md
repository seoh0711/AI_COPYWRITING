# /export - 카피 내보내기 커맨드

## 설명
작성된 카피를 다양한 형식으로 내보냅니다.

## 사용법
```
/export [챕터경로] --format [형식] --include-metadata
```

## 인자
- `챕터경로`: 내보낼 챕터 폴더 경로 (예: `manuscript/01-introduction`)
  - 미지정 시 전체 manuscript를 내보냄
- `--format`: 출력 형식 (기본값: `markdown`)
  - `markdown` - .md 파일
  - `json` - 구조화된 .json 파일
  - `html` - 웹용 .html 파일
  - `all` - 모든 형식으로 동시 내보내기
- `--include-metadata`: 메타데이터 포함 여부 (기본값: true)

## 실행 절차

### 1. 대상 확인
- 지정된 챕터 경로의 `final.md` 존재 여부 확인
- `final.md`가 없으면 `draft.md`를 사용하되 경고 메시지 출력
- 메타데이터 파일(`metadata.json`) 로드

### 2. 형식 변환
각 형식별 변환 로직:

#### Markdown 내보내기
```
출력: output/[챕터명]-export.md
구조:
  - 프론트매터 (YAML): 메타데이터
  - 본문: 카피 내용
  - 푸터: 프레임워크 정보, 생성일시
```

#### JSON 내보내기
```
출력: output/[챕터명]-export.json
구조:
  {
    "metadata": { ... },
    "framework": "PAS|BAB|FAB",
    "process_steps": { ... },
    "sections": [ ... ],
    "export_info": { "format": "json", "exported_at": "..." }
  }
```

#### HTML 내보내기
```
출력: output/[챕터명]-export.html
구조:
  - <head>: 메타 태그, 기본 스타일
  - <body>: 카피 본문 (시맨틱 HTML)
  - 프레임워크 라벨 포함
```

### 3. 출력 저장
- `output/` 디렉토리에 저장
- 파일명 형식: `[챕터ID]-[챕터명]-[형식].[확장자]`
- 내보내기 로그를 `output/export-log.json`에 기록

### 4. 결과 보고
```
✅ 내보내기 완료
  - 챕터: [챕터명]
  - 형식: [형식]
  - 파일: [파일경로]
  - 단어 수: [n]
  - 프레임워크: [PAS|BAB|FAB]
```

## 예시
```bash
# 특정 챕터를 마크다운으로 내보내기
/export manuscript/01-introduction --format markdown

# 전체를 JSON으로 내보내기
/export --format json

# 모든 형식으로 내보내기 (메타데이터 포함)
/export manuscript/02-chapter --format all --include-metadata
```
