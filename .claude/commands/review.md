# /review - 카피 검토 커맨드

## 설명
작성된 카피를 체계적으로 검토하고 점수와 개선점을 제공합니다.

## 사용법
```
/review [챕터경로] --depth [검토깊이] --focus [집중영역]
```

## 인자
- `챕터경로`: 검토할 챕터 폴더 경로
  - 미지정 시 가장 최근 수정된 챕터를 검토
- `--depth`: 검토 깊이 (기본값: `standard`)
  - `quick` - 핵심 항목만 빠르게 체크
  - `standard` - 전체 체크리스트 검토
  - `deep` - 심층 분석 + 대안 제시
- `--focus`: 집중 검토 영역 (기본값: `all`)
  - `framework` - 프레임워크 준수 점검
  - `emotion` - Emotion 레이어 점검
  - `logic` - Logic 레이어 점검
  - `authority` - Authority 레이어 점검
  - `readability` - 가독성 점검
  - `all` - 전체 점검

## 실행 절차

### 1. 카피 로드
- 대상 챕터의 카피 파일 로드 (`draft.md` 또는 `final.md`)
- 메타데이터 확인 (프레임워크, 타겟 오디언스)
- 이전 리뷰 결과가 있으면 로드

### 2. 체크리스트 실행
`review-checklist` 스킬의 체크리스트를 순차적으로 실행:

#### Quick 모드 (핵심 항목)
- 프레임워크 3단계 존재 여부
- 3단계 프로세스 적용 여부
- CTA 존재 여부
- 기본 가독성

#### Standard 모드 (전체)
- Quick 모드 전체 항목 +
- 프레임워크별 상세 체크리스트
- 3단계 프로세스별 상세 체크
- 톤앤매너 일관성
- 데이터/통계 검증

#### Deep 모드 (심층)
- Standard 모드 전체 항목 +
- 대안 표현 제시
- 경쟁 카피 대비 분석
- A/B 테스트 변형 제안
- 전환율 최적화 포인트

### 3. 점수 산출
각 영역별 100점 만점으로 점수 산출:
- `framework_compliance`: 프레임워크 준수도
- `emotion_layer`: 감정 레이어 효과
- `logic_layer`: 논리 레이어 효과
- `authority_layer`: 권위 레이어 효과
- `readability`: 가독성
- `persuasion`: 설득력

전체 점수 = 각 영역 가중 평균
```
가중치: framework(20%) + emotion(15%) + logic(20%) + authority(15%) + readability(15%) + persuasion(15%)
```

### 4. 개선점 도출
각 미통과 항목에 대해:
- 영향받는 섹션
- 구체적 문제 설명
- 개선 제안 (예시 포함)
- 우선순위 (high/medium/low)

### 5. 결과 저장 및 출력
- 결과를 `[챕터경로]/review-[날짜].json`에 저장
- 콘솔에 요약 결과 출력

## 출력 예시
```
📋 카피 리뷰 결과
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
챕터: 01-introduction
프레임워크: PAS
전체 점수: 82/100 (B등급)

영역별 점수:
  프레임워크 준수: ████████░░ 85
  감정 레이어:     ████████░░ 78
  논리 레이어:     ████████░░ 83
  권위 레이어:     ████████░░ 80
  가독성:          █████████░ 88
  설득력:          ████████░░ 82

개선 필요 항목 (3건):
  🔴 [HIGH] Agitate 섹션의 감정적 강도 부족
  🟡 [MED] 통계 데이터 출처 미기재
  🟢 [LOW] CTA 문구를 더 구체적으로 변경 권장
```

## 예시
```bash
# 특정 챕터 기본 검토
/review manuscript/01-introduction

# 빠른 검토
/review manuscript/02-chapter --depth quick

# 감정 레이어 집중 심층 검토
/review manuscript/01-introduction --depth deep --focus emotion
```
