# Skill: Chapter Structure (챕터 구조 설계)

## 목적
카피라이팅 콘텐츠의 챕터 구조를 체계적으로 설계하고 구성합니다.

## 트리거 조건
- 새로운 카피라이팅 프로젝트 시작 시
- 콘텐츠 구조 재설계 요청 시
- "챕터", "구조", "목차", "아웃라인" 키워드 포함 시

## 실행 절차

### Step 1: 콘텐츠 분석
1. 업로드된 데이터의 주제와 범위를 파악한다
2. 타겟 오디언스를 정의한다
3. 핵심 메시지를 추출한다

### Step 2: 프레임워크 매핑
1. 3단계 프로세스에 따라 콘텐츠를 분류한다:
   - **Emotion 섹션**: 호기심/흥미/흥분을 유발하는 도입부
   - **Logic 섹션**: 데이터/논거/통계로 뒷받침하는 본문
   - **Authority 섹션**: 추천사/사례/보증으로 마무리하는 결론부
2. 적합한 카피라이팅 프레임워크(PAS/BAB/FAB)를 선택한다

### Step 3: 챕터 구성
각 챕터는 다음 구조를 따른다:

```
manuscript/XX-chapter-name/
├── README.md          # 챕터 개요 및 목표
├── draft.md           # 카피 초안
├── data-analysis.md   # 데이터 분석 결과
├── final.md           # 최종 카피
└── metadata.json      # 챕터 메타데이터
```

### Step 4: 메타데이터 생성
각 챕터의 `metadata.json`에 포함할 정보:
```json
{
  "chapter_id": "01",
  "title": "챕터 제목",
  "framework": "PAS|BAB|FAB",
  "process_step": "emotion|logic|authority",
  "target_audience": "타겟 설명",
  "key_message": "핵심 메시지",
  "status": "draft|review|final",
  "word_count": 0,
  "created_at": "",
  "updated_at": ""
}
```

## 출력 형식
- 챕터 구조도: Markdown 트리 형식
- 각 챕터별 README.md 자동 생성
- 전체 목차: `manuscript/TABLE_OF_CONTENTS.md`

## 품질 기준
- 각 챕터는 하나의 명확한 목표를 가질 것
- 챕터 간 논리적 흐름이 자연스러울 것
- 3단계 프로세스의 순서(Emotion → Logic → Authority)를 준수할 것
- 선택된 프레임워크의 각 단계가 빠짐없이 포함될 것
